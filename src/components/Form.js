import React, { useContext,useState,useEffect } from 'react'
import { AppProvider } from '../context';
import styles from "../styles/form.module.css";
import { useNavigate } from "react-router-dom";
import { upload } from "../components/upload";
import { HANDLE_CHANGE, HANDLE_SUBMIT } from "../components/ActionType";

const Form = () => {
  const [files, setFiles] = useState(null);
  const navigate = useNavigate();
  const [delmg, setDelmg] = useState("");
  const {state,dispatch,initialState} =useContext(AppProvider)

  var today = new Date();
  var date =today.getMonth() + 1 +"  " +today.getDate()+  ", " +  today.getFullYear();

  const handleSubmit = (e) => {
    e.preventDefault();
    upload(state, dispatch, files, navigate,delmg,setDelmg);
    dispatch({ type: HANDLE_SUBMIT });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files[0]);
  };

  const handleChange = (e) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { date, name: e.target.name, value: e.target.value },
    });
  };

    useEffect(() => {
    if (state.edit) {
      setDelmg(state.data.imageName);
    }}, [state.edit]);
    
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
        />
        <label>Sub-Title</label>
        <input
          className={styles.inputs}
          type="text"
          name="subTitle"
          value={state.data.subTitle}
          onChange={handleChange}
        />
        <label>Description</label>
        <textarea
          type="text"
          value={state.data.description}
          name="description"
          onChange={handleChange}
        />
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