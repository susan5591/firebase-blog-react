import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {  AppProvider } from '../context'
import { RESET, SETDATA } from './ActionType'
import Form from './Form'

const Update = () => {
    const {id} = useParams()
    const {state,dispatch,datas} = useContext(AppProvider)
    
    useEffect(()=>{
        if(datas.length>0){
          const result = datas.find((item)=>item.id===id)
          console.log(result)
          dispatch({type:SETDATA,payload:{id,result}})
        }

      return(()=>{
        dispatch({type:RESET})
      })
    },[id,datas])

  return (
    <div>
       { state.data && <Form />}
    </div>
  )
}

export default Update