import React, {  useEffect,useState } from 'react'
import { collection, query, orderBy, startAfter, limit, getDocs, endBefore, limitToLast } from "firebase/firestore";  
import { db } from '../config';
import Card from './Card';
import styles from '../styles/search.module.css'

const FirebasePagination = ({setModal,size}) => {
    const [display,setDisplay] = useState([])
    const [page,setPage] = useState(0)
    const [documents,setDocuments] = useState([])
    const len = 6
    let totalPages = Math.ceil(size/len)

    //for first loading
    const pagination = async()=>{
        let arr1=[]
        const first = query(collection(db, "blog"), orderBy('title'),limit(len));
        const documentSnapshots = await getDocs(first);
        setDocuments(documentSnapshots)
        documentSnapshots.forEach((doc)=>{
            arr1.push({ ...doc.data(), id: doc.id })
        })
        setDisplay(arr1)
    }

    //for previous page
    const prevPage = async() =>{
        let arr = []
        const lastVisible = documents.docs[documents.docs.length-1];
        const prev = query(collection(db, "blog"),orderBy('title'),endBefore(lastVisible),limitToLast(len));
        const final = await getDocs(prev)
        setDocuments(final)
        final.forEach((doc)=>{
            arr.push({ ...doc.data(), id: doc.id })        
        })
        setDisplay(arr) 
        setPage(page-1)
    }

    //for next page
    const nextPage = async() =>{
        let arr2 = []
        const lastVisible = documents.docs[documents.docs.length-1];
        const next = query(collection(db, "blog"),orderBy('title'),startAfter(lastVisible),limit(len));
        const final = await getDocs(next)
        setDocuments(final)
        final.forEach((doc)=>{
            arr2.push({ ...doc.data(), id: doc.id })        
        })
        setDisplay(arr2) 
        setPage(page+1)
    }

    useEffect(()=>{
        pagination()
    },[])

    return (
        <div>
            <div className={styles.result}>
                {display.map((item)=>{
                    return <Card item={item} setModal={setModal} key={item.imageName}/>
                })}
            </div>
            <div className={styles.paginate}>
                {
                    page===0?<button className={`${styles.button} ${styles.passive}`}>Previous</button>
                    :<button className={`${styles.button} ${styles.active}`} onClick={prevPage}>Previous</button>
                }
                {
                    page===totalPages-1?<button className={`${styles.button} ${styles.passive}`} >Next</button>
                    :<button className={`${styles.button} ${styles.active}`} onClick={nextPage}>Next</button>
                }
            </div>
        </div>
    )
}

export default FirebasePagination