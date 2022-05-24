import * as type from "./ActionType";

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

const reducer = (state=initialState, action) => {
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
    

    case type.HANDLE_SUBMIT: 
      return initialState
    

    case type.UPDATE_DOC:
      return {
        ...state,
        data: {
          ...state.data,
          edit: action.payload.edit,
          id: action.payload.id,
        },
      };

    case type.HANDLE_UPDATE:
      return {
        ...state,
        id: action.payload.id,
        edit: true,
        data: action.payload.item,
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
        return initialState
    
    default:
      return state;
  }
};

export default reducer;
