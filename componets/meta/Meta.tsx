import { NextPage } from 'next';
import Head from 'next/head';

interface IProps {
  title?: string;
}

export const Meta: NextPage<IProps> = ({ title }) => {
  return (
    <Head>
      <title>{title || 'Colllored'}</title>
    </Head>
  );
};
