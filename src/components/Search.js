import React, { useContext, useState } from 'react'
import styles from '../styles/search.module.css'
import user from '../user.jpg'

const Search = ({data}) => {
    const {datas,search,setSearch,setModal} = data
    const result = datas.filter((item)=>item.title.includes(search))

    return (
        <div>
            <div className={styles.search}>
                <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)}/>
            </div>
            <div className={styles.result}>
                {search?result.map((item)=>{
                    return <div key={item.id} className={styles.card}>
                        <div className={styles.cardContent}>
                            <div className={styles.top}>
                                <div className={styles.images}>
                                    <img src={item.imageUrl?item.imageUrl:user} alt="image"/>
                                </div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                            <div className={styles.buttons}>
                                <button className={styles.delete} onClick={()=>setModal(true)}>Delete</button>
                                <button className={styles.details}>Details</button>
                            </div>
                        </div>
                    </div>
                }):''}
            </div>
        </div>
    )
}

export default Search