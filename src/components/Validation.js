import { HANDLE_ERROR } from "./ActionType"

export const checkField=(name,value,dispatch)=>{
    switch(name){   
        case 'title':
            if(!value){
                dispatch({type:HANDLE_ERROR,payload:{name:'errTitle',value:'Title is required'}})
                return false
            }
            dispatch({type:HANDLE_ERROR,payload:{name:'errTitle',value:""}})
            return true   

        case 'subTitle':
            if(!value){
                dispatch({type:HANDLE_ERROR,payload:{name:'errSubTitle',value:'SubTitle is required'}})
                return false
            }
            dispatch({type:HANDLE_ERROR,payload:{name:'errSubTitle',value:""}})
            return true

        case 'description':
            if(!value){
                dispatch({type:HANDLE_ERROR,payload:{name:'errDescription',value:'Description is required'}})
                return false
            }
            dispatch({type:HANDLE_ERROR,payload:{name:'errDescription',value:""}})
            return true
    }
}