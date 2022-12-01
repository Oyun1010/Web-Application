import styles from '../styles/Home.module.css'
import SignUpPage from './sign_up';
export default function Home() {
  return (
    <div className={styles.container}>
      <SignUpPage></SignUpPage>      
    </div>
  );
}

