import Head from 'next/head'
import Header from '../components/Header'
import SearchItem from "../components/SearchItem"
import Image from 'next/image'
import WineData from '../components/WineItems'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'


export default function Home() {
  // const router = useRouter();
  // const search = router.query;
  // console.log("Search: " + search);
 
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <hr></hr>
      <SearchItem/>
      <WineData/>
    </div>
  )
}