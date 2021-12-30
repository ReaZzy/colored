import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import s from './login.module.css';
import { ValidatedInput } from '../validatedInput/ValidatedInput';
import { useAppDispatch } from '../../hooks/redux';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import Preloader from '../preloader/Preloader';

const validationSchema = yup.object({
  find: yup.string().min(6).max(64).required(),
  password: yup.string().min(6).max(64).required(),
});

const loginMutation = gql`
  mutation login($find: String!, $password: String!) {
    login(find: $find, password: $password) {
      access_token
      user {
        id
        login
        avatar
      }
    }
  }
`;
const LoginForm = React.memo(() => {
  const [mutateFunction, { loading, error }] = useMutation(loginMutation);
  const router = useRouter();
  const handleSubmit = async (values: { find: string; password: string }) => {
    await mutateFunction({
      variables: { find: values.find, password: values.password },
    });
    await router.push('/');
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{ find: '', password: '' }}
      validationSchema={validationSchema}
    >
      <Form className={s.login__block}>
        <div className={s.login__item}>
          <label htmlFor={'find'}>Login or Email</label>
          <Field
            component={ValidatedInput}
            id={'find'}
            name={'find'}
            placeholder={'Enter your login or email'}
          />
        </div>
        <div className={s.login__item}>
          <label htmlFor={'password'}>Password</label>
          <Field
            component={ValidatedInput}
            id={'password'}
            name={'password'}
            placeholder={'Enter your password'}
            type={'password'}
          />
        </div>

        <button className={s.login__button} type={'submit'}>
          {loading ? <Preloader /> : 'Login'}
        </button>
        {!!error?.message && (
          <div className={`${s.error} ${s.login__block}`}>{error.message}</div>
        )}
      </Form>
    </Formik>
  );
});

LoginForm.displayName = 'LoginForm';
export default LoginForm;
