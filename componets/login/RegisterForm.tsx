import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import s from './login.module.css';
import { ValidatedInput } from '../validatedInput/ValidatedInput';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

const validationSchemaRegistration = yup.object({
  email: yup.string().email().max(64).required(),
  login: yup.string().min(6).max(64).required(),
  password: yup.string().min(8).max(64).required(),
});

const registerMutation = gql`
  mutation register($login: String!, $email: String!, $password: String!) {
    register(userData: { login: $login, email: $email, password: $password }) {
      access_token
      user {
        id
        login
        avatar
      }
    }
  }
`;

const RegisterForm = React.memo(() => {
  const router = useRouter();
  const [mutateFunction] = useMutation(registerMutation);
  const handleRegistration = async (values: {
    login: string;
    email: string;
    password: string;
  }) => {
    await mutateFunction({
      variables: {
        login: values.login,
        email: values.email,
        password: values.password,
      },
    });
    await router.push('/');
  };
  return (
    <Formik
      onSubmit={handleRegistration}
      initialValues={{
        email: '',
        login: '',
        password: '',
      }}
      validationSchema={validationSchemaRegistration}
    >
      <Form className={s.login__block}>
        <div className={s.login__item}>
          <label htmlFor={'email'}>Email</label>
          <Field
            component={ValidatedInput}
            id={'email'}
            name={'email'}
            type={'email'}
            placeholder={'Enter your email'}
          />
        </div>
        <div className={s.login__item}>
          <label htmlFor={'login'}>Login</label>
          <Field
            component={ValidatedInput}
            id={'login'}
            name={'login'}
            placeholder={'Enter your login'}
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
          Register
        </button>
      </Form>
    </Formik>
  );
});

RegisterForm.displayName = 'RegisterForm';
export default RegisterForm;
