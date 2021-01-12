import Image from '../image/image';
import styles from './postTile.module.scss';
import Link from 'next/link';

const PostTile = ({ title, img = {}, date, excerpt, slug }) => (
  <Link href={`/posts/${slug}`}>
    <figure className={styles.post}>
      <div className={styles['img-container']}>
        <Image src={img.src} alt={img.src} />
      </div>
      <figcaption className={styles.caption}>
        <h2 className="header-two">{title}</h2>
        <div>
          <time>{date}</time>
        </div>
        <p>{excerpt}</p>
      </figcaption>
    </figure>
  </Link>
);

export default PostTile;
