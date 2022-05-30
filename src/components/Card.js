import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/card.module.css'
import user from '../user.jpg'

const Card = ({item,setModal}) => {
    const navigate = useNavigate()

    const handleDetails=(id)=>{
        navigate(`/details/${id}`)
    }

    const handleUpdate =(id)=>{
        navigate(`/update/${id}`)
    }

    return (
        <div className={styles.card} onClick={()=>handleDetails(item.id)}>
            <div className={styles.cardContent}>
                <div className={styles.top}>
                    <div className={styles.images}>
                        <img src={item.imageUrl?item.imageUrl:user} alt=""/>
                    </div>
                    <h3>{item.title}</h3>
                    <p className={styles.par}>
                        {item.descriptions.length>200?item.descriptions.substring(0,200)+"...":item.descriptions}
                    </p>
                </div>
                <div className={styles.buttons} onClick={(e)=>e.stopPropagation()}>
                    <button className={styles.details} onClick={()=>handleUpdate(item.id)}>Update</button>
                    <button  className={styles.delete} onClick={()=>setModal({state:true,id:item.id})}>Delete</button>    
                </div>
            </div>
        </div>
    )
}

export default Card