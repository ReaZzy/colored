import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { login } from '../../store/reducers/auth/thunks';
import s from './login.module.css';
import { ValidatedInput } from '../validatedInput/ValidatedInput';
import { useAppDispatch } from '../../hooks/redux';
import { Meta } from '../meta/Meta';

const validationSchema = yup.object({
  find: yup.string().min(6).max(64).required(),
  password: yup.string().min(6).max(64).required(),
});
const LoginForm = React.memo(() => {
  const dispatch = useAppDispatch();
  const handleSubmit = async (values: { find: string; password: string }) => {
    await dispatch(await login(values.find, values.password));
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
