import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppProvider } from '../context'
import styles from '../styles/details.module.css'
import user from '../user.jpg'

const Details = () => {
  const {id} = useParams()
  const {state,datas} = useContext(AppProvider)
  const result = datas.find((item)=>item.id===id)

  return (
    <div className={styles.details}>
      <div className={styles.date}>
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