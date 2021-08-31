import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/reducers/auth/thunks';
import { useRouter } from 'next/router';
import s from './login.module.css';
import { Field, Form, Formik } from 'formik';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleSubmit = async (values: any) => {
    await dispatch(await login(values.find, values.password));
    await router.push('/');
  };
  return (
    <Formik onSubmit={handleSubmit} initialValues={{ find: '', password: '' }}>
      <Form>
        <label htmlFor={'find'}>Login or Email</label>
        <Field
          id={'find'}
          name={'find'}
          placeholder={'Enter your login or email'}
        />
        <label htmlFor={'password'}>Password</label>
        <Field
          id={'password'}
          name={'password'}
          placeholder={'Enter your password'}
          type={'password'}
        />
        <button type={'submit'}>Login 🔐</button>
      </Form>
    </Formik>
  );
};

export default Login;
