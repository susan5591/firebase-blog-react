import React, { useCallback, useEffect,useState } from 'react'
import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";  
import { db } from '../config';

const FirebasePagination = () => {
    const [first,setFirst] = useState([])
    const [size,setSize] = useState(0)

    
    const pagination = useCallback( async()=>{
        let arr=[]
        const first = query(collection(db, "blog"), orderBy('title'),limit(2));
        const documentSnapshots = await getDocs(first);
        documentSnapshots.forEach((doc)=>{
            arr.push(doc.data())
        })
        setFirst(arr)
        
        const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
        const next = query(collection(db, "blog"),
            orderBy('title'),
            startAfter(lastVisible),
            limit(2));

        const final = await getDocs(next)
        final.forEach((doc)=>{
            console.log(doc.data())
        })
    },[])

    useEffect(()=>{
        pagination()
    },[pagination])

    console.log(size)
    return (
        <div>
            {first.map((item)=>{
                return <div key={item.imageName}>
                    {item.title}
                </div>
            })}
        </div>
    )
}

export default FirebasePagination