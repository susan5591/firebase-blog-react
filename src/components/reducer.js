import * as type from "./ActionType";
import { initialState } from "../context";

const reducer = (state, action) => {
  switch (action.type) {
    case type.HANDLE_CHANGE: 
      return {
        ...state,
        data: {
          ...state.data,
          uploadedTime: action.payload.date,
          [action.payload.name]: action.payload.value,
        },
      };

    case type.SETDATA:  
      return {
        ...state,
        id:action.payload.id,
        edit: true,
        data:{
          ...state.data,
          ...action.payload.result
        },
      };

      case type.RESET:
        return {
          ...state,
          ...initialState
        }
      
      case type.HANDLE_ERROR:
        return{
          ...state,
          err:{
            ...state.err,
            ...action.payload
          }
        }
    
      default:
        return state;
  };
}

export default reducer;
