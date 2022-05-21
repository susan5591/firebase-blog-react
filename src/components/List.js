import React, { useState } from 'react'
import { useContext } from 'react'
import { AppProvider } from '../context'
import Search from './Search'
import styles from '../styles/list.module.css'
import Modal from './Modal'

const List = () => {
  const {datas}= useContext(AppProvider)
  const [search,setSearch] = useState('')
  const [modal,setModal] = useState({state:false,id:''})
  console.log(modal)
  return (
    <div className={styles.listing}>
      <Search data={{datas,search,setSearch,setModal}}/>
      {modal.state?<Modal modalData={{datas,modal,setModal}}/>:''}

    </div>
  )
}

export default List