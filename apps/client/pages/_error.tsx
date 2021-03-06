import React from 'react';
import Error from 'next/error';
import { GetServerSideProps, NextPage } from 'next';
import { Meta } from '../componets/meta/Meta';

interface IProps {
  statusCode: number;
}

const ErrorPage: NextPage<IProps> = ({ statusCode }) => {
  return (
    <Error statusCode={statusCode}>
      <Meta title={'505 - Server error'} />
    </Error>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const statusCode = ctx.res?.statusCode || 404;
  return { props: { statusCode } };
};

export default ErrorPage;
