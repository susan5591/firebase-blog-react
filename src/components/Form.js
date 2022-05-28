import React, { useContext, useState,useEffect } from "react";
import { AppProvider } from "../context";
import styles from "../styles/form.module.css";
import { useNavigate } from "react-router-dom";
import { upload } from "../components/upload";
import user from '../user.jpg'
import {
  HANDLE_CHANGE,
  HANDLE_ERROR,
  RESET,
} from "../components/ActionType";
import { checkErrors, validateFormField } from "./Validation";
import LinearProgressWithLabel from "./Progress";

const Form = () => {
  const [files, setFiles] = useState('');
  const [filed,setFiled] = useState('')
  const navigate = useNavigate();
  const { state, dispatch,setPage } = useContext(AppProvider);
  const [isFirst, setIsFirst] = useState(true);
  const [progress,setProgress] = useState(0)

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec"
  ];
  var today = new Date();
  var date = monthNames[today.getMonth()] + "  " + today.getDate() + ", " + today.getFullYear();

  const handleFileChange = (e) => {
    setFiles(e.target.files[0]);
    setFiled(URL.createObjectURL(e.target.files[0]))
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({type: HANDLE_CHANGE,payload: { date, name, value },});
    const errorAfterChange = !isFirst? validateFormField({ [name]: value }): {};
    dispatch({type: HANDLE_ERROR,payload: errorAfterChange,});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, subTitle, descriptions } = state.data;
    setIsFirst(false);
    const errors = validateFormField({ title, subTitle, descriptions });

    if (!checkErrors(errors)) {
      upload(state, dispatch, files, navigate,setProgress);
      setIsFirst(true)
      setPage(1)
      setFiles('')
    }
    dispatch({type: HANDLE_ERROR, payload: errors});
  };

  useEffect(()=>{
    if(isFirst){
      dispatch({type:RESET})
    }
  },[isFirst])

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          className={styles.inputs}
          type="text"
          name="title"
          value={state.data.title}
          onChange={handleChange}
          validator={["required"]}
        />
        {state.err.title && (
          <span className={styles.error}>{state.err.title}</span>
        )}

        <label>Sub-Title</label>
        <input
          className={styles.inputs}
          type="text"
          name="subTitle"
          value={state.data.subTitle}
          onChange={handleChange}
          validator={["required"]}
        />
        {state.err.subTitle && (
          <span className={styles.error}>{state.err.subTitle}</span>
        )}

        <label>Description</label>
        <textarea
          type="text"
          value={state.data.descriptions}
          name="descriptions"
          onChange={handleChange}
          validator={["required","minlength50"]}
        />
        {state.err.descriptions && (
          <span className={styles.error}>{state.err.descriptions}</span>
        )}

        <label>Add Image</label>
        {filed||state.edit?<div className={styles.profile}><img src={filed||state.data.imageUrl||user} className={styles.profileOne} alt="name" /></div>:''}
        <input
          type="file"
          className={styles.file}
          onChange={handleFileChange}
        />

        <button className={styles.button}>
          {state.edit ? "Update" : "Submit"}
        </button>
      </form>
      {progress && <LinearProgressWithLabel value={progress} />}
    </div>
  );
};

export default Form;
