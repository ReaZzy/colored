import { NextPage } from 'next';
import Head from 'next/head';

interface IProps {
  title?: string;
  image?: string;
  url?: string;
  description?: string;
}

export const Meta: NextPage<IProps> = ({ title, image, url, description }) => {
  return (
    <Head>
      <meta property="og:title" content={`${title}`} />
      <meta property="og:image" content={`${image}`} />
      <meta property="og:url" content={`${url}`} />
      <meta property="og:description" content={`${description}`} />
      <meta property="og:type" content="website" />
      <title>{title || 'Colored'}</title>
    </Head>
  );
};
