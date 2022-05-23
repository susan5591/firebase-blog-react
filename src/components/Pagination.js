import React, { useContext,useState } from 'react'
import { AppProvider } from '../context'
import Card from './Card'
import styles from '../styles/search.module.css'

const Pagination = ({setModal}) => {
    const {state} = useContext(AppProvider) 
    const [page,setPage] = useState(0)

    const size = 3
    let arr = []
    for (let i = 0; i < state.retrieveData.length; i += size) {
        let chunk = state.retrieveData.slice(i, i + size);
        arr.push(chunk)
    }
    console.log(arr)

    return ( 
        <div>
            <div className={styles.result}>
                {
                    arr[page].map((item)=>{
                        return <Card item={item} setModal={setModal} key={item.id}/>
                })}                
            </div>
            <div className={styles.paginate}>
                {page===0?'':<button onClick={()=>setPage(page-1)}>Previous</button>}
                {page===arr.length-1?'':<button onClick={()=>setPage(page+1)}>next</button>}
            </div>
        </div>
    )
}

export default Pagination