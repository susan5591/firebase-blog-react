import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/navbar.module.css'

const Navbar = () => {
  return (
    <nav className={styles.main}>
        <ul className={styles.list}>
            <li className={styles.listing}><Link to='/'>Home</Link></li>
            <li className={styles.listing}><Link to='/list'>List</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar