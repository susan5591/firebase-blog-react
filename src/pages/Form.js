import React,{useContext, useEffect, useState} from 'react'
import styles from '../styles/form.module.css'
import { AppProvider } from '../context'
import {upload} from '../components/upload'
import { useNavigate } from 'react-router-dom'
import { HANDLE_CHANGE, SUBMIT_FILE } from '../components/ActionType'

const Form = () => {
  const navigate = useNavigate()
  const {state,dispatch,initialState}= useContext(AppProvider)
  const [success,setSuccess] = useState(false)

  //for date
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  var today = new Date();
  var date = today.getFullYear()+'-'+monthNames[today.getMonth()+1]+'-'+today.getDate();

  //for onchange
  const handleChange = (e)=>{
    dispatch({type:HANDLE_CHANGE,payload:{date,name:e.target.name,value:e.target.value}})
    // setStates({...states,
    //   [e.target.name]:e.target.value,
    //   uploadedTime:date
    // })
  }

  const handleFileChange=(e)=>{
    // setFiles(e.target.files[0])
    dispatch({type:SUBMIT_FILE,payload:e.target.files[0]})
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    upload(initialState,state,dispatch,setSuccess)
    // upload(files,setFiles,states,setStates,initialState,setSuccess,update,setUpdate)
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
          <input className={styles.inputs} type="text" name='title' value={state.data.title} onChange={handleChange} />
          <label>Sub-Title</label>
          <input className={styles.inputs} type="text" name='subTitle' value={state.data.subTitle} onChange={handleChange}/>
          <label>Description</label>
          <textarea type="text" value={state.data.description} name='description' onChange={handleChange}/>
          <label>Add Image</label>
          <input type="file" className={styles.file} onChange={handleFileChange}/>
          <button className={styles.button}>{state.edit?'UPdate':'Submit'}</button>
        </form>
    </div>
  )
}

export default Form