import React from 'react'
import styles from '../styles/modal.module.css'

const Modal = ({modalData}) => {
  const {modal,setModal,datas} = modalData

  const handleDelete =()=>{
    setModal(false)
  }
  const handleState=()=>{
    setModal(false)
  }
  return (
    <div className={styles.modal} onClick={handleState}>
      <div className={styles.text} onClick={(e) => e.stopPropagation()}>
        <p className={styles.confirm}> Do you really want to delete this item?</p>
        <button onClick={handleDelete}>Confirm</button>
      </div>
    </div>
  )
}

export default Modal