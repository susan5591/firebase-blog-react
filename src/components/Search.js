import React, { useContext, useState } from 'react'
import styles from '../styles/search.module.css'
import Card from './Card'

const Search = ({data}) => {
    const {state,search,setSearch,setModal} = data
    const result = state.retrieveData.filter((item)=>item.title.includes(search))

    return (
        <div>
            <div className={styles.search}>
                <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)}/>
            </div>
            <div className={styles.result}>
                {search?result.map((item)=>{
                    return <Card item={item} setModal={setModal} key={item.id}/>
                }):''}
            </div>
        </div>
    )
}

export default Search