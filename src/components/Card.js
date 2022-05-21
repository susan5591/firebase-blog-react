import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/search.module.css'
import user from '../user.jpg'

const Card = ({item,setModal}) => {
    const navigate = useNavigate()

    const handleDetails=(id)=>{
        navigate(`/details/${id}`)
    }
    return (
        <div className={styles.card} onClick={()=>handleDetails(item.id)}>
            <div className={styles.cardContent}>
                <div className={styles.top}>
                    <div className={styles.images}>
                        <img src={item.imageUrl?item.imageUrl:user} alt="image"/>
                    </div>
                    <h3>{item.title}</h3>
                    <p>
                        {item.description.length>200?item.description.substring(0,200)+"...":item.description}
                    </p>
                </div>
                <div className={styles.buttons} onClick={(e)=>e.stopPropagation()}>
                    <button  className={styles.delete} onClick={()=>setModal({state:true,id:item.id})}>Delete</button>
                    <button className={styles.details}>Update</button>
                </div>
            </div>
        </div>
    )
}

export default Card