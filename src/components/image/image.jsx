import styles from './image.module.scss';
import { useEffect, useRef, useState } from 'react';

const Image = ({
  src,
  srcSet,
  alt,
  fallbackSrc,
  isLazy = true,
  onClick,
  style,
}) => {
  const imgEl = useRef(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    let lazyImageObserver;
    if (isLazy && imgEl) {
      if ('IntersectionObserver' in window) {
        lazyImageObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              lazyImageObserver.unobserve(entry.target);
              setLoad(true);
            }
          });
        });

        lazyImageObserver.observe(imgEl.current);
      } else {
        setLoad(true);
      }
    }

    return function cleanUp() {
      if (lazyImageObserver) {
        lazyImageObserver.unobserve(imgEl.current);
      }
    };
  }, [imgEl, isLazy, setLoad]);

  return (
    <img
      ref={imgEl}
      src={!isLazy || load ? src : fallbackSrc}
      alt={alt}
      className={styles.image}
      srcSet={!isLazy || load ? srcSet : null}
      style={style}
      onClick={onClick}
    />
  );
};

export default Image;
