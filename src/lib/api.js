import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

export const postsDirectory = join(process.cwd(), 'src/data/posts');
const pageDirectory = join(process.cwd(), 'src/data/pages');

/**
 * Returns a list pages
 * @returns {string[]} Array of folder names in the pages directory
 */
export function getPageLists() {
  return fs
    .readdirSync('src/pages')
    .filter((v) => !/.jsx|.js/.test(v))
    .reverse();
}

export function getPostSlugs() {
  let postList;
  try {
    postList = fs.readdirSync(postsDirectory);
  } catch (e) {
    postList = [];
  }
  return postList.map((slug) => slug.replace(/\.md$/, ''));
}

async function getMarkDownData(folder, page) {
  const content = await import(`../data/${folder}/${page}.md`);
  return matter(content.default);
}

/**
 * Get data associated with page from markdown file
 * @param {string} page name of page
 */
export const getPageData = (page) => getMarkDownData('pages', page);

/**
 * Get data associated with post from markdown file
 * @param {string} page
 */
export const getPostData = (page) => getMarkDownData('posts', page);

/**
 * Get Data associated with the app
 */
export async function getConfigData() {
  let numOfPosts;
  try {
    numOfPosts = fs.readdirSync(postsDirectory)?.length;
  } catch (e) {
    //if there is an error then the folder can't be found
    numOfPosts = 0;
  }
  const data = await import('../data/config.md');
  const mdData = matter(data.default)?.data;
  if (mdData && numOfPosts) {
    const hasPost = mdData.navLinks.reduce(
      (acc, cur) => acc || cur.name === 'posts',
      false
    );

    if (!hasPost) {
      mdData.navLinks.push({
        href: '/posts',
        name: 'posts',
      });
    }
  }
  return mdData;
}

/**
 * Generates props for static props
 * @param {string} page The name of the page
 * @returns Page Props
 */
export async function getPageProps(page) {
  const { data, content } = await getPageData(page);
  const config = await getConfigData();
  return {
    props: {
      logoImage: config?.logoImage,
      navLinks: config?.navLinks,
      data,
      content,
    },
  };
}

/**
 * Generates props for static props
 * @param {string} page The name of the page
 * @returns Page Props
 */
export async function getPostProps(page) {
  const { data, content } = await getPostData(page?.params?.slug);
  const config = await getConfigData();
  return {
    props: {
      logoImage: config?.logoImage,
      navLinks: config?.navLinks,
      data,
      content,
    },
  };
}

/**
 * The get static paths method for post paths
 */
export async function getPostPaths() {
  const posts = getPostSlugs();

  return {
    paths: posts.map((slug) => {
      return {
        params: {
          slug,
        },
      };
    }),
    fallback: false,
  };
}
