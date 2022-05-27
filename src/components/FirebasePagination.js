import React, {  useContext, useEffect,useState } from 'react'
import { collection, query, orderBy, startAfter, limit, getDocs, endBefore, limitToLast, startAt} from "firebase/firestore";  
import { db } from '../config';
import Card from './Card';
import styles from '../styles/search.module.css'
import { AppProvider } from '../context';
import CircularIndeterminate from './Loading';
import { useNavigate } from 'react-router-dom';

const FirebasePagination = ({setModal,size}) => {
    const navigate = useNavigate()
    const {documents,setDocuments,page,setPage} = useContext(AppProvider)
    const [display,setDisplay] = useState([])
    const [loading,setLoading] = useState(true)
    const len = 3
    let totalPages = Math.ceil(size/len)

    //mix optimized
    const paginateFunc = async(type) =>{
        let arr=[]
        // if(size){
            const lastVisible = documents.docs[documents.docs.length-1];
            let lastBack = documents.docs[0];
            let queryData
            if(display.length){    
                if(type==='prev'){
                    queryData =  query(collection(db, "blog"),orderBy('title'),endBefore(lastBack),limitToLast(len));
                    setPage(prev=>prev-1)
                }
                else if(type==='next'){
                    queryData =  query(collection(db, "blog"),orderBy('title'),startAfter(lastVisible),limit(len));
                    setPage(prev=>prev+1)
                }
                const final = await getDocs(queryData)
                setDocuments(final)
                final.forEach((doc)=>{
                    arr.push({ ...doc.data(), id: doc.id })        
                })
            }
            setDisplay(arr) 
        // }
    }

    useEffect(()=>{
        async function fetchData(){
            let arr1=[]
            let first
            if(size){
                if(page===1){
                    first = query(collection(db, "blog"), orderBy('title'),limit(len));
                }else{
                    const lastVisible = documents.docs[0];
                    first = query(collection(db, "blog"), orderBy('title'),startAt(lastVisible), limit(len));
                }
                const documentSnapshots = await getDocs(first);
                setDocuments(documentSnapshots)
                documentSnapshots.forEach((doc)=>{
                    arr1.push({ ...doc.data(), id: doc.id })
                })
                setLoading(false)
                if(arr1.length){
                    setDisplay(arr1)
                }else{
                    paginateFunc("prev")
                }
            }else{
                setDisplay([])
            }
        }
        fetchData()
    },[size])

    if(size){
        if(loading){
            return <div>
                <CircularIndeterminate />
                <h1 className={styles.loading}>Loading .....</h1>
            </div>
        }
    }

    if(!display.length){
        return <div>
            <h1 className={styles.loading}>Nothing to show here</h1>
            <button className={styles.loadingButton} onClick={()=>navigate('/')}>Create blog</button>
        </div>
    }

    return (
        <div>
            <div className={styles.result}>
                {display.map((item)=>{
                    return <Card item={item} setModal={setModal} key={item.imageName}/>
                })}
            </div>
            <div className={styles.paginate}>
                {
                    page===1?''
                    :<button className={`${styles.button} ${styles.active}`} onClick={()=>paginateFunc("prev")}>Previous</button>
                }
                {
                    page===totalPages?''
                    :<button className={`${styles.button} ${styles.active}`} onClick={()=>paginateFunc("next")}>Next</button>
                }
            </div>
        </div>
    )
}

export default FirebasePagination