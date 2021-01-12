import PostTile from '../../components/postTile/postTile';
import PlaceHolderBlock from '../../components/placeholderBlock/PlaceholderBlock';
import { getPostData, getPostSlugs, getConfigData } from '../../lib/api';
import styles from './post.module.scss';

const Posts = ({ data }) => {
  return (
    <>
      <h1 className="header-1">Posts</h1>
      {data.length > 0 ? (
        <ol className={styles.list}>
          {data.map((v, i) => (
            <li key={v.slug + i}>
              <PostTile {...v} />
            </li>
          ))}
        </ol>
      ) : (
        <PlaceHolderBlock />
      )}
    </>
  );
};

export const getStaticProps = async () => {
  const postsFiles = getPostSlugs();
  const postList = [];
  const config = await getConfigData();
  const getPostSnapShot = async (postsFiles) => {
    const slug = postsFiles.pop();
    const { data = {} } = await getPostData(slug);
    postList.push({
      title: data.postTitle,
      img: data.thumbnail,
      date: data.date,
      excerpt: data.excerpt,
      slug,
    });

    if (postsFiles.length) getPostSnapShot(postsFiles);
  };
  getPostSnapShot(postsFiles);
  return {
    props: {
      logoImage: config?.logoImage,
      navLinks: config?.navLinks,
      data: postList,
    },
  };
};

export default Posts;
