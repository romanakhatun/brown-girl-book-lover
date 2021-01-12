import Image from '../image/image';
import styles from './vtCard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const VtCard = ({ title, image, link, caption, button, fa, name, av_caption }) => {
    return (
        <div className={styles.vtCart}>
            {av_caption && <p>{av_caption}</p>}
            <div className={styles['img-container']}>
                {image && <Image src={image?.src} alt={image?.alt} />}
            </div>
            <h3>{title}</h3>
            <p>{name && (<strong>{name}:</strong>)} {caption}</p>
            <a href={link} target="_blank" download><FontAwesomeIcon className={styles.icon} icon={fa} />{button}</a>
        </div>
    );
};

export default VtCard;