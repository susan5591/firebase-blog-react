import React, {  useContext, useEffect,useState } from 'react'
import { collection, query, orderBy, startAfter, limit, getDocs, endBefore, limitToLast, onSnapshot } from "firebase/firestore";  
import { db } from '../config';
import Card from './Card';
import styles from '../styles/search.module.css'
import { AppProvider } from '../context';

const FirebasePagination = ({setModal,modal,size}) => {
    const {state} = useContext(AppProvider)
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

    //mix optimized
    const paginateFunc = async(type) =>{
        let arr=[]
        const lastVisible = documents.docs[documents.docs.length-1];
        let q
        if(type==='prev'){
            q =  query(collection(db, "blog"),orderBy('title'),endBefore(lastVisible),limitToLast(len));
            setPage(page-1)
        }
        else if(type==='next'){
            q =  query(collection(db, "blog"),orderBy('title'),startAfter(lastVisible),limit(len));
            setPage(page+1)
        }
        const final = await getDocs(q)
        setDocuments(final)
        final.forEach((doc)=>{
            arr.push({ ...doc.data(), id: doc.id })        
        })
        setDisplay(arr) 
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
                    :<button className={`${styles.button} ${styles.active}`} onClick={()=>paginateFunc("prev")}>Previous</button>
                }
                {
                    page===totalPages-1?<button className={`${styles.button} ${styles.passive}`} >Next</button>
                    :<button className={`${styles.button} ${styles.active}`} onClick={()=>paginateFunc("next")}>Next</button>
                }
            </div>
        </div>
    )
}

export default FirebasePagination