'use client';
import { useRouter } from 'next/navigation';
import styles from './MainPage/HomePage/HomePage.module.css';  


export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/MainPage/UserInput');
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.pngcontainer}>
          <video className={styles.video} autoPlay loop muted playsInline>
            <source src="/together.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className={styles.envelopecontainer}>
          <h3 className={styles.fonts}>This might be the cutest thing you do today!</h3>
          <button 
            className={styles.button} 
            onClick={handleButtonClick}
          >
            What's Cooking!!!???
          </button>
        </div>
      </div>
    </div>
  );
}