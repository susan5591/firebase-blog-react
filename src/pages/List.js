import React, { useState } from 'react'
import { useContext } from 'react'
import { AppProvider } from '../context'
import Search from '../components/Search'
import styles from '../styles/list.module.css'
import Modal from '../components/Modal'

const List = () => {
  const {state,dispatch}= useContext(AppProvider)
  const [search,setSearch] = useState('')
  const [modal,setModal] = useState({state:false,id:''})
  console.log(modal)
  return (
    <div className={styles.listing}>
      <Search data={{state,search,setSearch,setModal}}/>
      {modal.state?<Modal modalData={{state,modal,setModal}}/>:''}

    </div>
  )
}

export default List