import styles from './imgCarousel.module.scss';
import Image from '../image/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

function useSlide(numOfSlides) {
  const [[state, direction], setState] = useState([0, 0]);

  /**
   * sets the direction
   * @param {'back' | 'next'} dir the direction
   */
  function setter(dir) {
    const num = {
      back: -1,
      next: 1,
    };
    const nextSlide = state + num[dir];
    if (nextSlide < 0) {
      setState([numOfSlides - 1, num[dir]]);
    } else if (nextSlide >= numOfSlides) {
      setState([0, num[dir]]);
    } else {
      setState([nextSlide, num[dir]]);
    }
  }

  return [[state, direction], setter];
}

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;

const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const ImgCarousel = ({ slides = [] }) => {
  console.log(slides);
  const [[state, direction], setter] = useSlide(slides.length);
  return (
    <div className={styles.container}>
      <div className={styles.slides}>
        <AnimatePresence initial={false} custom={direction}>
          {slides.map(({ img }, i) => {
            return (
              state === i && (
                <motion.div
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'tween', stiffness: 100, damping: 200 },
                    opacity: { duration: 0.2 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      setter('next');
                    } else if (swipe > swipeConfidenceThreshold) {
                      setter('back');
                    }
                  }}
                  key={img.src + i}
                  className={styles.slide}
                >
                  <Image {...img} />
                </motion.div>
              )
            );
          })}
        </AnimatePresence>
        <button className={styles.back} onClick={() => setter('back')}>
          <AiFillCaretLeft title={'back'} />
        </button>
        <button className={styles.next} onClick={() => setter('next')}>
          <AiFillCaretRight title={'next'} />
        </button>
      </div>
      <div className={styles.text}>
        <p aria-live="polite" aria-atomic="true">
          <span className={styles.hidden}>
            {`Slide ${state + 1} of ${slides.length}`}
          </span>
          {slides[state]?.description}
        </p>
      </div>
    </div>
  );
};

export default ImgCarousel;
