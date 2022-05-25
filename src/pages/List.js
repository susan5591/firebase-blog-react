import React, { useState } from 'react'
import { useContext } from 'react'
import { AppProvider } from '../context'
import Search from '../components/Search'
import styles from '../styles/list.module.css'
import Modal from '../components/Modal'
import FirebasePagination from '../components/FirebasePagination'

const List = () => {
  const {state,datas,size}= useContext(AppProvider)
  const [search,setSearch] = useState('')
  const [modal,setModal] = useState({state:false,id:''})

  return (
    <div className={styles.listing}>
      <Search data={{state,search,setSearch,setModal,datas}}/>
      {modal.state && <Modal modalData={{modal,setModal,datas}}/>}
      {!search && <FirebasePagination setModal={setModal} size={size}/>}
    </div>
  )
}

export default List