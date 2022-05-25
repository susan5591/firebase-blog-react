import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppProvider } from '../context'
import styles from '../styles/details.module.css'
import user from '../user.jpg'
import {IoMdArrowRoundBack} from 'react-icons/io'

const Details = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const {datas} = useContext(AppProvider)
  const result = datas.find((item)=>item.id===id)

  const handleBack = ()=>{
    navigate(-1)
  }

  return (
    <div className={styles.details}>
      <div className={styles.date} >
        <IoMdArrowRoundBack className={styles.back} onClick={handleBack}/>
        <p>{result.uploadedTime}</p>
      </div>
      <div className={styles.imageSection}>
        <img src={result.imageUrl?result.imageUrl:user} alt='image'/>
      </div>
      <div >
        <h1 className={styles.header}>{result.title}</h1>
        <p className={styles.paragraph}>{result.description}</p>
      </div>
    </div>
  )
}

export default Details