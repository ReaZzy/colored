import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { login } from '../../store/reducers/auth/thunks';
import s from './login.module.css';
import { ValidatedInput } from '../validatedInput/ValidatedInput';
import { useAppDispatch } from '../../hooks/redux';
import { Meta } from '../meta/Meta';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { setLoginError, setUser } from '../../store/reducers/auth/reducer';
import { setJwtToken } from '../../utils/setJwtToken';
import { useRouter } from 'next/router';

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
  const dispatch = useAppDispatch();
  const [mutateFunction, { data, loading, error }] = useMutation(loginMutation);
  const router = useRouter();
  const handleSubmit = async (values: { find: string; password: string }) => {
    await mutateFunction({
      variables: { find: values.find, password: values.password },
    });
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
          Login
        </button>
      </Form>
    </Formik>
  );
});

LoginForm.displayName = 'LoginForm';
export default LoginForm;
