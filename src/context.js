import { createContext, useEffect, useCallback, useReducer, useState } from "react";
// import reducer from "./components/Reducer";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "./config";
import reducer from "./components/reducer";

const AppProvider = createContext();

const AppContext = ({ children }) => {
  const [datas,setDatas] = useState([])
  const [state,dispatch] = useReducer(reducer)
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
