import { createContext, useEffect, useCallback, useReducer, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "./config";
import reducer from "./components/reducer";

const AppProvider = createContext();
const initialState = {
  data:{
    title: "",
    subTitle: "",
    descriptions: "",
    imageUrl: "",
    imageName: "",
    uploadedTime: "",
  },
  err:{
    title:'',
    subTitle:'',
    descriptions:''
  },
  id:'',
  edit:false,
};
const AppContext = ({ children }) => {
  const [documents,setDocuments] = useState([])
  const [datas,setDatas] = useState([])
  const [state,dispatch] = useReducer(reducer,initialState)
  const [size,setSize] = useState(0)
  const [page,setPage] = useState(0)
  
  const getData = useCallback(
    () =>
      onSnapshot(collection(db, "blog"), (querySnapShot) => {
        setSize(querySnapShot.size)
        let arr = [];
        querySnapShot.forEach((doc) => {
          arr.push({ ...doc.data(), id: doc.id });
        });
        setDatas(arr)
      }),
    []
  );

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <AppProvider.Provider
      value={{ datas,state,dispatch,size,documents,setDocuments,page,setPage}}
    >
      {children}
    </AppProvider.Provider>
  );
};

export { AppProvider, AppContext };
