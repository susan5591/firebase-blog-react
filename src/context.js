import { createContext, useEffect, useCallback, useReducer } from "react";
// import reducer from "./components/Reducer";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "./config";
import reducer from "./components/reducer";
import { RETRIEVE_DATA } from "./components/ActionType";

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
  edit:false,
  retrieveData:[]
};

const AppContext = ({ children }) => {

  const [state,dispatch] = useReducer(reducer,initialState)

  const getData = useCallback(
    () =>
      onSnapshot(collection(db, "blog"), (querySnapShot) => {
        let arr = [];
        querySnapShot.forEach((doc) => {
          arr.push({ ...doc.data(), id: doc.id });
        });
        dispatch({type:RETRIEVE_DATA,payload:arr})
      }),
    []
  );

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <AppProvider.Provider
      value={{ initialState, state,dispatch}}
    >
      {children}
    </AppProvider.Provider>
  );
};

export { AppProvider, AppContext };
