import React from "react";
import styles from "../styles/form.module.css";
import Form from "../components/Form";

const Home = () => {
  return (
    <div>
      <h1 className={styles.heading}>Welcome To The Blog App</h1>
      <Form/>
    </div>
  );
};

export default Home;
