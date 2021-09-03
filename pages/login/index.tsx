import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/reducers/auth/thunks';
import { useRouter } from 'next/router';
import s from './login.module.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  find: yup.string().min(6).max(64).required(),
  password: yup.string().min(6).max(64).required(),
});

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleSubmit = async (values: { find: string; password: string }) => {
    await dispatch(await login(values.find, values.password));
    await router.push('/');
  };
  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{ find: '', password: '' }}
      validationSchema={validationSchema}
    >
      {({ errors, touched }) => (
        <Form className={s.login}>
          <label htmlFor={'find'}>Login or Email</label>
          <Field
            id={'find'}
            name={'find'}
            placeholder={'Enter your login or email'}
          />
          <ErrorMessage name={'find'} />
          <label htmlFor={'password'}>Password</label>
          <Field
            id={'password'}
            name={'password'}
            placeholder={'Enter your password'}
            type={'password'}
          />
          <ErrorMessage name={'password'} />
          <button type={'submit'}>Login 🔐</button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
