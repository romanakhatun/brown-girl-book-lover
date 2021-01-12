import Image from '../image/image';
import styles from './tileGroup.module.scss';

const TileGroup = ({ tiles = [] }) => {
  return (
    <div className={styles.group}>
      {tiles.map((v, i) => (
        <div key={`tile${i}`} className={styles.tile}>
          <div className={styles['img-container']}>
            <Image {...v.image} />
          </div>
          <div className={styles.content}>
            <div className={styles.name}>
              {v.name}
              <span className={styles.location}> {v.location}</span>
            </div>
            <div className={styles.book}>
              <em>{v.book}</em>
            </div>
            <div className={styles.author}> {v.author}</div>
            {v.book2 && (
              <>
                <div className={styles.book}>
                  <em>{v.book2}</em>
                </div>
                <div className={styles.author}>by {v.author2}</div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TileGroup;
