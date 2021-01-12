import Head from 'next/head';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './layout.module.scss';
import { useRouter } from 'next/router';

const Layout = ({ data, logoImage, navLinks, children }) => {
  const { title = '', description = '', keywords = '' } = data;
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="Description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={router.pathname} />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <Header logoImage={logoImage} navLinks={navLinks} />
      <main className={styles.body}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
