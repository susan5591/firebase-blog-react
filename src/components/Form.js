import React from 'react'
import styles from "../styles/form.module.css";

const Form = ({data}) => {
    const {state,handleFileChange,handleChange,handleSubmit} = data
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