import {getDownloadURL,ref, uploadBytesResumable} from 'firebase/storage'
import { storage } from '../config'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../config'

export const upload=(files,states,setStates,initialState,setSuccess)=>{
    if(files){
        const storageRef = ref(storage,`blog/${files.name}`)
        const uploadTask = uploadBytesResumable(storageRef,files)
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
                ...states,
                imageUrl:downloadUrl,
                imageName:files.name
              }
              addDoc(collection(db,'blog'),data)
              .then(()=>setSuccess(true))
              .catch(()=>console.log("Error While Uploading."))
            })
          }
        )
      }else{
        addDoc(collection(db,'blog'),states)
          .then(()=>setSuccess(true))
          .catch(()=>console.log("Error While Uploading."))
      }
      setStates(initialState)
}

