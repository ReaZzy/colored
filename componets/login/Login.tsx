import React, { useState } from 'react';
import Image from 'next/image';
import loginBC from '../../utils/images/loginBC.jpg';
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
const validationSchemaRegistration = yup.object({
  emailRegistration: yup.string().email().max(64).required(),
  loginRegistration: yup.string().min(6).max(64).required(),
  passwordRegistration: yup.string().min(6).max(64).required(),
});

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isRegistration, setIsRegistration] = useState(false);
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
      <div className={s.login__image}>
        <Image
          src={loginBC}
          layout={'fill'}
          className={'login__image'}
          alt={'right-bc-image'}
        />
      </div>

      <div className={s.login}>
        {!isRegistration ? (
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
        ) : (
          <Formik
            onSubmit={handleSubmit}
            initialValues={{
              emailRegistration: '',
              loginRegistration: '',
              passwordRegistration: '',
            }}
            validationSchema={validationSchemaRegistration}
          >
            <Form className={s.login__block}>
              <div className={s.login__item}>
                <label htmlFor={'emailRegistration'}>Email</label>
                <Field
                  component={ValidatedInput}
                  id={'emailRegistration'}
                  name={'emailRegistration'}
                  placeholder={'Enter your email'}
                />
              </div>
              <div className={s.login__item}>
                <label htmlFor={'loginRegistration'}>Login</label>
                <Field
                  component={ValidatedInput}
                  id={'loginRegistration'}
                  name={'loginRegistration'}
                  placeholder={'Enter your login'}
                />
              </div>
              <div className={s.login__item}>
                <label htmlFor={'passwordRegistration'}>Password</label>
                <Field
                  component={ValidatedInput}
                  id={'passwordRegistration'}
                  name={'passwordRegistration'}
                  placeholder={'Enter your password'}
                  type={'password'}
                />
              </div>
              <button className={s.login__button} type={'submit'}>
                Login
              </button>
            </Form>
          </Formik>
        )}
        <div className={s.noAccaunt}>
          {isRegistration ? 'Already a member? ' : `Don\'t have an account? `}
          <span
            className={s.noAccaunt__register}
            onClick={() => {
              setIsRegistration(!isRegistration);
            }}
          >
            {isRegistration ? 'Login' : 'Register'}
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default Login;
