import { createContext, useEffect, useCallback, useReducer, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "./config";
import reducer from "./components/reducer";

const AppProvider = createContext();
const initialState = {
  data:{
    title: "",
    subTitle: "",
    description: "",
    imageUrl: "",
    imageName: "",
    uploadedTime: "",
  },
  id:'',
  edit:false
};
const AppContext = ({ children }) => {
  const [datas,setDatas] = useState([])
  const [state,dispatch] = useReducer(reducer,initialState)
  
  const getData = useCallback(
    () =>
      onSnapshot(collection(db, "blog"), (querySnapShot) => {
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
      value={{ datas,state,dispatch}}
    >
      {children}
    </AppProvider.Provider>
  );
};

export { AppProvider, AppContext };
