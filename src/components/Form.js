import React, { useContext, useState } from "react";
import { AppProvider } from "../context";
import styles from "../styles/form.module.css";
import { useNavigate } from "react-router-dom";
import { upload } from "../components/upload";
import {
  HANDLE_CHANGE,
  RESET,
  HANDLE_ERROR,
} from "../components/ActionType";
import { checkErrors, validateFormField } from "./Validation";
import LinearProgressWithLabel from "./Progress";

const Form = () => {
  const [files, setFiles] = useState(null);
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

    if (checkErrors(errors)) {
      alert("error form");
    } else {
      upload(state, dispatch, files, navigate,setProgress);
      dispatch({ type: RESET });
      setIsFirst(true)
      setPage(1)
    }
    dispatch({type: HANDLE_ERROR, payload: errors});
  };

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
        {state.edit && state.data.imageUrl && (
          <img src={state.data.imageUrl} alt="name" />
        )}
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
