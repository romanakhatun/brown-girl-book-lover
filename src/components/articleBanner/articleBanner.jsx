import styles from './articleBanner.module.scss';
import Image from '../image/image';

const ArticleBanner = ({ img, title }) => (
  <div className={styles.container}>
    <div className={styles.banner}>
      <Image src={img?.src} alt={img?.alt} />
    </div>
    <h1>{title}</h1>
  </div>
);

export default ArticleBanner;
