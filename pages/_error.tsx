import Error from 'next/error';
import { GetServerSideProps, NextPage } from 'next';

const ErrorPage: NextPage<any> = ({ statusCode }) => {
  return <Error statusCode={statusCode}></Error>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const statusCode = ctx.res?.statusCode || 404;
  return { props: { statusCode } };
};

export default ErrorPage;
