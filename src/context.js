import { createContext, useEffect, useCallback, useState } from "react";
// import reducer from "./components/Reducer";
import { onSnapshot,collection } from "firebase/firestore";
import { db } from "./config";

const AppProvider = createContext()

const initialState = {
    title:'',
    subTitle:'',
    description:'',
    imageUrl:'',
    imageName:'',
    uploadedTime:''
}

const AppContext = ({children}) =>{
    const [datas,setDatas] = useState([])
    const [states,setStates] = useState(initialState)
    const [files,setFiles] = useState(null)

    const getData = useCallback(()=>onSnapshot(collection(db, "blog"), (querySnapShot) => {
        let arr = []
        querySnapShot.forEach((doc)=>{
            arr.push({...doc.data(),id:doc.id})
        })
        setDatas(arr)
    }),[]);

    useEffect(()=>{
        getData()
    },[getData])

    return <AppProvider.Provider value={{files,setFiles,states,setStates,datas,initialState}}>
        {children}
    </AppProvider.Provider>
}

export {AppProvider,AppContext}