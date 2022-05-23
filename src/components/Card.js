import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/card.module.css'
import user from '../user.jpg'
import { AppProvider } from '../context'
import { HANDLE_UPDATE } from './ActionType'

const Card = ({item,setModal}) => {
    const {state,dispatch}= useContext(AppProvider)
    const navigate = useNavigate()

    const handleDetails=(id)=>{
        navigate(`/details/${id}`)
    }

    const handleUpdate =(id)=>{
        dispatch({type:HANDLE_UPDATE,payload:{id,edit:true,item}})
        navigate('/')
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
                    <button className={styles.details} onClick={()=>handleUpdate(item.id)}>Update</button>
                </div>
            </div>
        </div>
    )
}

export default Card