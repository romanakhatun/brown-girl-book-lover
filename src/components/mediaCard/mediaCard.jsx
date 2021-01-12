import styles from './mediaCard.module.scss';
import Image from '../image/image';
import ReactMarkdown from 'react-markdown';
import { FaPlay } from 'react-icons/fa';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/core';

const MediaCard = ({ image, text, youTubeUrl, title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <figure className={styles.video}>
        {youTubeUrl ? (
          <button className={styles.poster} onClick={onOpen}>
            <Image src={image?.src} alt={image?.alt} />
            <div className={styles.play}>
              <FaPlay />
            </div>
          </button>
        ) : (
            <div className={styles.poster}>
              <Image src={image?.src} alt={image?.alt} />
            </div>
          )}
        <figcaption>
          <h3>{title}</h3>
          <ReactMarkdown>{text}</ReactMarkdown>
        </figcaption>
      </figure>
      {youTubeUrl && (
        <Modal isOpen={isOpen} size={'600px'} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className={styles['yt-container']}>
                <iframe
                  width="100%"
                  height="100%"
                  src={youTubeUrl}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default MediaCard;
