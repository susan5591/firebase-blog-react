import {getDownloadURL,ref, uploadBytesResumable} from 'firebase/storage'
import { storage } from '../config'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { db } from '../config'
import { HANDLE_SUBMIT, UPDATE_DOC } from './ActionType'

export const upload=(initialState,state,dispatch,setSuccess)=>{
  const date= new Date()
  const now = date.getTime()
  if(state.files){
      const storageRef = ref(storage,`blog/${now}`)
      const uploadTask = uploadBytesResumable(storageRef,state.files)
      uploadTask.on('state_changed',
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        console.log(`uploading ${progress} %`)
      },
      (error)=>{
        console.log("Error Occured While Uploading")
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
            let data = {
              ...state.data,
              imageUrl:downloadUrl,
              imageName:now
            }
            if(!state.edit){
              addDoc(collection(db,'blog'),data)
              .then(()=>setSuccess(true))
              .catch(()=>console.log("Error While Uploading."))
            }else{
              setDoc(doc(db,"blog",state.id),data)
              // .then(()=>(setUpdate({state:false,id:''}),setSuccess(true)))
              .then(()=>(
                dispatch({type:UPDATE_DOC,payload:{edit:false,id:''}}),
                setSuccess(true))
              )
              .catch(()=>console.log("Error While Updating."))
            }
          })
        }
      )
    }else{
      if(!state.edit){
        addDoc(collection(db,'blog'),state.data)
        .then(()=>setSuccess(true))
        .catch(()=>console.log("Error While Uploading."))
      }else{
        setDoc(doc(db,"blog",state.id),state.data)
        .then(()=>(
          dispatch({type:UPDATE_DOC,payload:{edit:false,id:''}}),
          setSuccess(true))
        )
        .catch(()=>console.log("Error While Updating."))
      }
    }
    dispatch({type:HANDLE_SUBMIT,payload:{initialState,files:null}})
    // setStates(initialState)
    // setFiles(null)
}

