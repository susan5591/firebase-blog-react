import React, {  useContext, useEffect,useState } from 'react'
import { collection, query, orderBy, startAfter, limit, getDocs, endBefore, limitToLast, startAt} from "firebase/firestore";  
import { db } from '../config';
import Card from './Card';
import styles from '../styles/search.module.css'
import { AppProvider } from '../context';

const FirebasePagination = ({setModal,size}) => {
    const {documents,setDocuments} = useContext(AppProvider)
    const [display,setDisplay] = useState([])
    const [page,setPage] = useState(0)
    // const [documents,setDocuments] = useState([])
    const len = 3
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
        let lastBack = documents.docs[0];
        let q
        if(type==='prev'){
            q =  query(collection(db, "blog"),orderBy('title'),endBefore(lastBack),limitToLast(len));
            setPage(prev=>prev-1)
        }
        else if(type==='next'){
            q =  query(collection(db, "blog"),orderBy('title'),startAfter(lastVisible),limit(len));
            setPage(prev=>prev+1)
        }
        const final = await getDocs(q)
        setDocuments(final)
        final.forEach((doc)=>{
            arr.push({ ...doc.data(), id: doc.id })        
        })
        setDisplay(arr) 
    }
    useEffect(()=>{
        async function fetchData(){
            console.log("first")
            if(page!==0){
                let arr1=[]
                const lastVisible = documents.docs[0];
                const first = query(collection(db, "blog"), orderBy('title'),startAt(lastVisible), limit(len));
                const documentSnapshots = await getDocs(first);
                setDocuments(documentSnapshots)
                documentSnapshots.forEach((doc)=>{
                    arr1.push({ ...doc.data(), id: doc.id })
                })
                setDisplay(arr1)
            }else{
                let arr1=[]
                const first = query(collection(db, "blog"), orderBy('title'),limit(len));
                const documentSnapshots = await getDocs(first);
                setDocuments(documentSnapshots)
                documentSnapshots.forEach((doc)=>{
                    arr1.push({ ...doc.data(), id: doc.id })
                })
                setDisplay(arr1)
            }
        }
        fetchData()
    },[size])

    useEffect(()=>{
        pagination()

        return (()=>{
            pagination()
        })
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
                    page===0?''
                    :<button className={`${styles.button} ${styles.active}`} onClick={()=>paginateFunc("prev")}>Previous</button>
                }
                {
                    page===totalPages-1?''
                    :<button className={`${styles.button} ${styles.active}`} onClick={()=>paginateFunc("next")}>Next</button>
                }
            </div>
        </div>
    )
}

export default FirebasePagination