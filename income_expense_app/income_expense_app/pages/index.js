import Head from 'next/head'
import Image from 'next/image'
import LoginPage from './login'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <LoginPage/>
    </div>
  )
}
