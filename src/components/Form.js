import React, { useContext, useState, useEffect } from "react";
import { AppProvider } from "../context";
import styles from "../styles/form.module.css";
import { useNavigate } from "react-router-dom";
import { upload } from "../components/upload";
import {
  HANDLE_CHANGE,
  HANDLE_SUBMIT,
  HANDLE_ERROR,
} from "../components/ActionType";
import { checkErrors, validateFormField } from "./Validation";

const Form = () => {
  const [files, setFiles] = useState(null);
  const navigate = useNavigate();
  const [delmg, setDelmg] = useState("");
  const { state, dispatch,setPage } = useContext(AppProvider);
  const [isFirst, setIsFirst] = useState(true);

  var today = new Date();
  var date =
    today.getMonth() + 1 + "  " + today.getDate() + ", " + today.getFullYear();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, subTitle, descriptions } = state.data;
    setIsFirst(false);
    const errors = validateFormField({ title, subTitle, descriptions });

    if (checkErrors(errors)) {
      alert("error form");
    } else {
      upload(state, dispatch, files, navigate, delmg, setDelmg);
      dispatch({ type: HANDLE_SUBMIT });
      setIsFirst(true)
      setPage(0)
    }
    dispatch({
      type: HANDLE_ERROR,
      payload: errors,
    });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: HANDLE_CHANGE,
      payload: { date, name, value },
    });
    const errorAfterChange = !isFirst
      ? validateFormField({ [name]: value })
      : {};
    dispatch({
      type: HANDLE_ERROR,
      payload: errorAfterChange,
    });
  };

  useEffect(() => {
    if (state.edit) {
      setDelmg(state.data.imageName);
    }
  }, [state.edit]);

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
    </div>
  );
};

export default Form;
