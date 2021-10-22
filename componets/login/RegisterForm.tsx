import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import s from './login.module.css';
import { register } from '../../store/reducers/auth/thunks';
import { useRouter } from 'next/router';
import { ValidatedInput } from '../validatedInput/ValidatedInput';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';

const validationSchemaRegistration = yup.object({
  email: yup.string().email().max(64).required(),
  login: yup.string().min(6).max(64).required(),
  password: yup.string().min(8).max(64).required(),
});

const RegisterForm = React.memo(() => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const registrationError = useAppSelector(
    (state) => state.auth.registrationError,
  );
  const handleRegistration = async (values: {
    login: string;
    email: string;
    password: string;
  }) => {
    await dispatch(await register(values.login, values.email, values.password));
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
        {registrationError && (
          <div
            style={{
              borderBottom: '2px solid rgb(246, 54, 54)',
              color: 'rgb(246, 54, 54)',
            }}
          >
            {registrationError}
          </div>
        )}
        <button className={s.login__button} type={'submit'}>
          Register
        </button>
      </Form>
    </Formik>
  );
});

RegisterForm.displayName = 'RegisterForm';
export default RegisterForm;
