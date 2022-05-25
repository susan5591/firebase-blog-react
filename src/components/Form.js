import React, { useContext,useState,useEffect } from 'react'
import { AppProvider } from '../context';
import styles from "../styles/form.module.css";
import { useNavigate } from "react-router-dom";
import { upload } from "../components/upload";
import { HANDLE_CHANGE, HANDLE_SUBMIT } from "../components/ActionType";
import { checkField } from './Validation';

const Form = () => {
  const [files, setFiles] = useState(null);
  const navigate = useNavigate();
  const [delmg, setDelmg] = useState("");
  const {state,dispatch} =useContext(AppProvider)
  const [isFirst,setIsFirst] = useState(true)

  var today = new Date();
  var date =today.getMonth() + 1 +"  " +today.getDate()+  ", " +  today.getFullYear();

  const validateForm = (e)=>{
    e.preventDefault()
    const {title,subTitle,description} = state.data
    let a =checkField('title',title,dispatch)
    let b =checkField('subTitle',subTitle,dispatch)
    let c =checkField('description',description,dispatch)
    setIsFirst(false)
    if(a&&b&&c){
      handleSubmit()
    }
  }

  const handleSubmit = (e) => {
    setIsFirst(true)
    upload(state, dispatch, files, navigate,delmg,setDelmg);
    dispatch({ type: HANDLE_SUBMIT });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files[0]);
  };

  const handleChange = (e) => {
    const {name,value}=e.target
    dispatch({
      type: HANDLE_CHANGE,
      payload: { date, name, value },
    });
    if(!isFirst){
      checkField(name,value,dispatch)
    }
  };
    useEffect(() => {
      if (state.edit) {
        setDelmg(state.data.imageName);
      }
    }, [state.edit]);

  return (
    <div>
        <form className={styles.form} onSubmit={validateForm}>
        <label>Title</label>
        <input
          className={styles.inputs}
          type="text"
          name="title"
          value={state.data.title}
          onChange={handleChange}
        />
        {state.err.errTitle && <span className={styles.error}>{state.err.errTitle}</span>}
        <label>Sub-Title</label>
        <input
          className={styles.inputs}
          type="text"
          name="subTitle"
          value={state.data.subTitle}
          onChange={handleChange}
        />
        <span className={styles.error}>{state.err.errSubTitle}</span>
        <label>Description</label>
        <textarea
          type="text"
          value={state.data.description}
          name="description"
          onChange={handleChange}
        />
        <span className={styles.error}>{state.err.errDescription}</span>
        <label>Add Image</label>
        {state.edit && (state.data.imageUrl && <img src={state.data.imageUrl} alt="name"/>)}
        <input
          type="file"
          className={styles.file}
          onChange={handleFileChange}
        />
        <button className={styles.button}>
          {state.edit ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  )
}

export default Form