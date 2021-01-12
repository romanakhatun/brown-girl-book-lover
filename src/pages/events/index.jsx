import { getPageProps } from '../../lib/api';
import { motion } from 'framer-motion';
import { pageVariants } from '../../lib/motionVariants';
import styles from './events.module.scss';
import CardCta from '../../components/cardCta/cardCta';
import BlockQuote from '../../components/blockQuote/blockQuote';
import PlaceholderBlock from '../../components/placeholderBlock/PlaceholderBlock';
import ImgCarousel from '../../components/imgCarousel/imgCarousel';

const Events = ({ data }) => (
  <motion.div
    className={styles.layout}
    initial="initial"
    animate="enter"
    exit="exit"
    variants={pageVariants}
  >
    <h1 className="header-1">{data?.header}</h1>
    <section>
      <h2 className="header-two">{data?.upComingEvent?.title}</h2>
      {data?.upComingEvent?.events?.length > 0 ? (
        <div className={styles['card-container']}>
          {data?.upComingEvent?.events?.map((obj, i) => {
            return (
              <CardCta key={`upComingEvent${i}`} image={obj?.image}>
                <div>
                  <strong>{obj?.title}</strong>
                </div>
                <time>{obj?.date}</time> <span>{obj?.location}</span>
                <div className={styles['card-btn']}>Attend this Event</div>
              </CardCta>
            );
          })}
        </div>
      ) : (
          <PlaceholderBlock />
        )}
    </section>
    <section>
      <h2 className="header-two">{data?.carousel?.title}</h2>
      <ImgCarousel slides={data?.carousel?.slides} />
    </section>
    <section>
      <h2 className="header-two">{data?.reviews?.title}</h2>
      <div className={styles['block-section']}>
        {data?.reviews?.reviews?.map((v, i) => (
          <BlockQuote key={`bp${i}`} {...v} />
        ))}
      </div>
    </section>
  </motion.div>
);

export const getStaticProps = async () => getPageProps('events');

export default Events;
