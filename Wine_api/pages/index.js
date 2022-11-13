import React from 'react'
import styles from '../styles/Home.module.css'
import Header from '../components/Header/header'
import Body from './body'


export default function Home() {
  return (
    <div className={styles.container}>
      <Header/>
      <Body/>
    </div>
  )
}
