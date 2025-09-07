import Image from "next/image";
import styles from "./page.module.css";
import KakaoMap from "./components/KakaoMap";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>YaguRoute</h1>
        </div>

        <div className={styles.mapContainer}>
          <KakaoMap 
            width="100%" 
            height="500px"
            center={{ lat: 37.5665, lng: 126.9780 }}
            level={3}
          />
        </div>
      </main>
    </div>
  );
}
