import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {  AppProvider } from '../context'
import { RESET, SETDATA } from './ActionType'
import Form from './Form'

const Update = () => {
    const {id} = useParams()
    const {state,dispatch,initialState} = useContext(AppProvider)
    
    useEffect(()=>{
        if(state.retrieveData.length>0){
          const result = state.retrieveData.find((item)=>item.id===id)
          console.log(result)
          dispatch({type:SETDATA,payload:{id,result}})
        }

      return(()=>{
        dispatch({type:RESET,payload:{data:initialState.data,edit:false,id:''}})
      })
      
    },[id,state.retrieveData])

  return (
    <div>
       { state.data && <Form />}
    </div>
  )
}

export default Update