import React, { useContext, useState } from 'react'
import styles from '../styles/search.module.css'

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
                            <div className={styles.images}>
                                <img src={item.imageUrl} alt="image"/>
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                        <button onClick={()=>setModal(true)}>Delete</button>
                        <button >Details</button>
                    </div>
                }):''}
            </div>
        </div>
    )
}

export default Search