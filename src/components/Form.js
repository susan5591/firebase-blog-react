import React,{useContext, useEffect, useState} from 'react'
import styles from '../styles/form.module.css'
import { AppProvider } from '../context'
// import {getDownloadURL,ref, uploadBytesResumable} from 'firebase/storage'
// import { storage } from '../config'
// import { addDoc, collection } from 'firebase/firestore'
// import { db } from '../config'
import {upload} from './upload'
import { useNavigate } from 'react-router-dom'

const Form = () => {
  const navigate = useNavigate()
  const {initialState}= useContext(AppProvider)
  const [states,setStates] = useState(initialState)
  const [files,setFiles] = useState(null)
  const [success,setSuccess] = useState(false)

  //for date
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  var today = new Date();
  var date = today.getFullYear()+'-'+monthNames[today.getMonth()+1]+'-'+today.getDate();

  //for onchange
  const handleChange = (e)=>{
    setStates({...states,
      [e.target.name]:e.target.value,
      uploadedTime:date
    })
  }

  const handleFileChange=(e)=>{
    setFiles(e.target.files[0])
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    upload(files,states,setStates,initialState,setSuccess)
  }

  useEffect(()=>{
    if(success){
      navigate('/list')
      setSuccess(false)
    }
  },[success])

  return (
    <div>
        <h1 className={styles.heading}>Welcome To The Blog App</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Title</label>
          <input className={styles.inputs} type="text" name='title' value={states.title} onChange={handleChange} />
          <label>Sub-Title</label>
          <input className={styles.inputs} type="text" name='subTitle' value={states.subTitle} onChange={handleChange}/>
          <label>Description</label>
          <textarea type="text" value={states.description} name='description' onChange={handleChange}/>
          <label>Add Image</label>
          <input type="file" className={styles.file} onChange={handleFileChange}/>
          <button className={styles.button}>Submit</button>
        </form>
    </div>
  )
}

export default Form