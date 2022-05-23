import React from 'react'
import styles from '../styles/modal.module.css'
import {doc,deleteDoc} from "firebase/firestore"
import { db, storage} from '../config'
import { deleteObject, ref } from 'firebase/storage'

const Modal = ({modalData}) => {
  const {modal,setModal,state} = modalData
  let file = state.retrieveData.find((item)=>item.id===modal.id)
  console.log(file.imageName)
  const deleteRef = ref(storage,`blog/${file.imageName}`)

  const handleDelete =async(id)=>{
    if(file.imageName){
      deleteObject(deleteRef)
        .then(()=>deleteDoc(doc(db,"blog",id))
        .then(()=>console.log("deleted both")))
    }else{
      deleteDoc(doc(db,"blog",id))
      .then(()=>console.log("deleted data"))
      .catch(()=>console.log("don't know the error"))
    }
    setModal({state:false,id})
  }
  const handleState=()=>{
    setModal({state:false,id:''})
  }
  return (
    <div className={styles.modal} onClick={handleState}>
      <div className={styles.text} onClick={(e) => e.stopPropagation()}>
        <p className={styles.confirm}> Do you really want to delete this item?</p>
        <button onClick={()=>handleDelete(modal.id)}>Confirm</button>
      </div>
    </div>
  )
}

export default Modal