import * as type from "./ActionType";
const reducer = (state, action) => {
  switch (action.type) {
    case type.RETRIEVE_DATA:
      return {
        ...state,
        retrieveData: action.payload,
      };

    case type.HANDLE_CHANGE: {
      return {
        ...state,
        data: {
          ...state.data,
          uploadedTime: action.payload.date,
          [action.payload.name]: action.payload.value,
        },
      };
    }

    case type.HANDLE_SUBMIT: {
      return {
        ...state,
        data: action.payload.initialState,
        files: action.payload.null,
        edit: false,
      };
    }

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

    default:
      return state;
  }
};

export default reducer;
