import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppProvider } from '../context'
import styles from '../styles/details.module.css'

const Details = () => {
  const {id} = useParams()
  const {state} = useContext(AppProvider)
  const result = state.retrieveData.find((item)=>item.id===id)
  
  return (
    <div className={styles.details}>
      <div className={styles.date}>
        <p>{result.uploadedTime}</p>
      </div>
      <div className={styles.imageSection}>
        <img src={result.imageUrl} alt='image'/>
      </div>
      <div >
        <h1 className={styles.header}>{result.title}</h1>
        <p className={styles.paragraph}>{result.description}</p>
      </div>
    </div>
  )
}

export default Details