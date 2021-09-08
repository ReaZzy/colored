import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/reducers/auth/thunks';
import { useRouter } from 'next/router';
import s from './login.module.css';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import Modal from 'react-modal';
import { ValidatedInput } from '../validatedInput/ValidatedInput';

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
    <Modal
      isOpen={true}
      contentLabel="Login"
      className="Modal"
      overlayClassName="Overlay"
    >
      <img
        src={
          'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHJlYWR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'
        }
        className={s.login__image}
        alt={'right-bc-image'}
      />
      <div className={s.login}>
        <Formik
          onSubmit={handleSubmit}
          initialValues={{ find: '', password: '' }}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
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
                Login 🔐
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default Login;
