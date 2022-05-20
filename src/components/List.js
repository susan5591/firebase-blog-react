import React from 'react'
import { useContext } from 'react'
import { AppProvider } from '../context'

const List = () => {
  const {state,datas}= useContext(AppProvider)
  console.log(datas)
  return (
    <div>List</div>
  )
}

export default List