import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/reducers/auth/thunks';
import { useRouter } from 'next/router';
import s from './login.module.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import Modal from 'react-modal';

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
  // const modalStyles = {
  //   content: {
  //     position: 'absolute',
  //     top: '40px',
  //     left: '40px',
  //     right: '40px',
  //     bottom: '40px',
  //     background: '#fff',
  //     overflow: 'hidden',
  //     borderRadius: '15px',
  //     outline: 'none',
  //     display: 'flex',
  //     flexDirection: 'row',
  //     filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1))',
  //   },
  //   overlay: {
  //     zIndex: 10,
  //     position: 'fixed',
  //     top: 0,
  //     left: 0,
  //     right: 0,
  //     bottom: 0,
  //     backgroundColor: 'rgba(255, 255, 255, 0.75)',
  //   },
  // };
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
                  id={'find'}
                  name={'find'}
                  placeholder={'Enter your login or email'}
                />
                <ErrorMessage name={'find'} />
              </div>
              <div className={s.login__item}>
                <label htmlFor={'password'}>Password</label>
                <Field
                  id={'password'}
                  name={'password'}
                  placeholder={'Enter your password'}
                  type={'password'}
                />
                <ErrorMessage name={'password'} />
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
