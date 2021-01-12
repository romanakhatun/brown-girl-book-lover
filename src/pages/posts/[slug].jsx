import { getPostProps, getPostPaths } from '../../lib/api';
import ReactMarkdown from 'react-markdown';
import ArticleBanner from '../../components/articleBanner/articleBanner';
import styles from './post.module.scss';
import Image from '../../components/image/image';

function Blog({ data, content }) {
  const { postTitle, heroImage, date = '', author } = data;
  return (
    <>
      <ArticleBanner img={heroImage} title={postTitle} />
      <div className={styles.body}>
        <div className={styles.author}>
          <Image src={author?.img?.src} alt={author?.img?.alt} />
          <div>
            by {author.name}
            <time dateTime={date}>{date}</time>
          </div>
        </div>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </>
  );
}

export const getStaticPaths = () => getPostPaths();

// This also gets called at build time
export const getStaticProps = (page) => getPostProps(page);

export default Blog;
