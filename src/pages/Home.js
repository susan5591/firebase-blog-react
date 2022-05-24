import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/form.module.css";
import { AppProvider } from "../context";
import { upload } from "../components/upload";
import { useNavigate } from "react-router-dom";
import { HANDLE_CHANGE, HANDLE_SUBMIT } from "../components/ActionType";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config";
import Form from "../components/Form";

const Home = () => {
  const navigate = useNavigate();
  const { state, dispatch, initialState } = useContext(AppProvider);
  const [files, setFiles] = useState(null);
  const [delmg, setDelmg] = useState("");

  //for date
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var today = new Date();
  var date =
    monthNames[today.getMonth() + 1] +
    "  " +
    today.getDate()+  ", " +  today.getFullYear();

  //for onchange
  const handleChange = (e) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { date, name: e.target.name, value: e.target.value },
    });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    upload(state, dispatch, files, navigate,delmg,setDelmg);
    dispatch({ type: HANDLE_SUBMIT, payload: { initialState, files: null } });
  };

  useEffect(() => {
    if (state.edit) {
      setDelmg(state.data.imageName);
    }
  }, [state.edit]);

  return (
    <div>
      <h1 className={styles.heading}>Welcome To The Blog App</h1>
      <Form data={{state,handleChange,handleFileChange,handleSubmit}}/>
    </div>
  );
};

export default Home;
