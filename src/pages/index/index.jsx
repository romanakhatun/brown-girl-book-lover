import styles from './index.module.scss';
import { getPageProps } from '../../lib/api';
import { motion } from 'framer-motion';
import { pageVariants } from '../../lib/motionVariants';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Accordion from '../../components/accordion/accordion';
import AccordionPanel from '../../components/accordionPanel/accordionPanel';
import BlockQuote from '../../components/blockQuote/blockQuote';
import CtaBtn from '../../components/cta-btn/ctaBtn';
import CardCta from '../../components/cardCta/cardCta';
import GroupLayout from '../../components/groupLayout/groupLayout';
import Link from 'next/link';
import PlaceholderBlock from '../../components/placeholderBlock/PlaceholderBlock';
import VtCard from '../../components/vtCard/vtCard';

const Home = ({ data }) => {
  const { mainHeader, drawer, blockQuote, callToActionCards = [] } = data;
  return (
    <motion.div
      className={styles.layout}
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
    >
      <h1 className="header-1">{mainHeader}</h1>
      <BlockQuote {...blockQuote} />
      <CtaBtn link={blockQuote.link} text={blockQuote['cta_text']} />
      <Accordion>
        <AccordionPanel title={drawer?.drawer1?.label}>
          <div className={styles.drawerBlockquote}>
            <h3>{data?.drawer?.drawer1?.quote}</h3>
          </div>
          <div className={styles['drawer-container']}>
            {drawer?.drawer1?.drawerCta.map((v, i) => (
              <VtCard
                key={`${v.title}${i}int`}
                image={v.image}
                link={v.link}
                button={v.btn}
                av_caption={v.av_caption}
                title={v.title}
                fa={faPlus}
              />
            ))}
          </div>
        </AccordionPanel>
        <AccordionPanel title={drawer?.drawer2?.label}>
          <div className={styles.drawerBlockquote}>
            <h3>{data?.drawer?.drawer2?.quote}</h3>
          </div>
          <PlaceholderBlock />
        </AccordionPanel>
      </Accordion>
      <GroupLayout>
        {callToActionCards.map(({ image, caption, link }, i) => {
          const relativePath = /^\//.test(link);
          return relativePath ? (
            <Link href={link} key={`card${i}`} passHref>
              <CardCta image={image} text={caption} />
            </Link>
          ) : (
              <CardCta
                key={`card${i}`}
                href={link}
                image={image}
                text={caption}
              />
            );
        })}
      </GroupLayout>
    </motion.div>
  );
};

export const getStaticProps = async () => getPageProps('index');

export default Home;
