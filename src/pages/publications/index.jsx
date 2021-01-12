import styles from './publications.module.scss';
import VtCard from '../../components/vtCard/vtCard';
import { getPageProps } from '../../lib/api';
import { motion } from 'framer-motion';
import { pageVariants } from '../../lib/motionVariants';
import { faDownload, faPlus } from '@fortawesome/free-solid-svg-icons';

const Publications = ({ data }) => {
    return (
        <motion.div
            className={styles.layout}
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
        >
            <h1 className="header-1">{data?.mainHeader}</h1>
            <section>
                <h2 className="header-two">{data?.actual?.title}</h2>
                <div className={styles['writing-container']}>
                    {data?.actual?.writingCard.map((v, i) => (
                        <VtCard
                            key={`${v.title}${i}int`}
                            title={v.title}
                            image={v.image}
                            link={v.link}
                            caption={v.caption}
                            button={v.btn}
                            fa={faPlus}
                        />
                    ))}
                </div>
            </section>
            <section>
                <h2 className="header-two">{data?.download?.title}</h2>
                <div className={styles['writing-container']}>
                    {data?.download?.writingCard.map((v, i) => (
                        <VtCard
                            key={`${v.title}${i}int`}
                            title={v.title}
                            image={v.image}
                            link={v.link}
                            caption={v.caption}
                            name={v.name}
                            button={v.btn}
                            fa={faDownload}
                        />
                    ))}
                </div>
            </section>
            <div className={styles.smallHeading1}><h1><cite>{data?.title2}</cite></h1></div>
        </motion.div>
    );
};
export const getStaticProps = async () => getPageProps('publications');
export default Publications;