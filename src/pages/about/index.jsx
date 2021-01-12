import { getPageProps } from '../../lib/api';
import { motion } from 'framer-motion';
import { pageVariants } from '../../lib/motionVariants';
import styles from './about.module.scss';
import Profile from '../../components/profile/profile';
import BadgeGroup from '../../components/badgeGroup/badgeGroup';
import BlockQuote from '../../components/blockQuote/blockQuote';

const About = ({ data, content }) => (
  <motion.div
    className={styles.layout}
    initial="initial"
    animate="enter"
    exit="exit"
    variants={pageVariants}
  >
    <h1 className={`header-1 ${styles.header}`}>{data?.header}</h1>
    <section className={styles.desc}>
      <BlockQuote {...data?.blockQuote} />
    </section>
    <section className={styles.profile}>
      <Profile markup={content} image={data?.authorImage} />
    </section>
    <section className={styles['author-facts']}>
      <h2 className="header-two">{data?.authorFacts?.title}</h2>
      <BadgeGroup badges={data?.authorFacts?.facts} />
    </section>
    <section className={styles['site-facts']}>
      <h2 className={'header-two'}>{data?.siteFacts?.title}</h2>
      <BadgeGroup badges={data?.siteFacts?.facts} />
    </section>
  </motion.div>
);

export const getStaticProps = async () => getPageProps('about');

export default About;
