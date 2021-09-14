import Image from 'next/image';
import React, { useState } from 'react';
import Modal from 'react-modal';
import loginBC from '../../utils/images/loginBC.jpg';
import s from './login.module.css';
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter';
import { SiFacebook } from '@react-icons/all-files/si/SiFacebook';
import { FaGoogle } from '@react-icons/all-files/fa/FaGoogle';
import dynamic from 'next/dynamic';

const LoginForm = dynamic(() => import('./LoginForm'));
const RegisterForm = dynamic(() => import('./RegisterForm'));

const Login: React.FC = () => {
  const [isRegistration, setIsRegistration] = useState(false);
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
        {isRegistration ? <RegisterForm /> : <LoginForm />}
        <div className={s.noAccaunt}>
          <div className={s.loginVia}>
            Or login via
            <div className={s.social}>
              <FaGoogle />
              <SiFacebook />
              <FaTwitter />
            </div>
          </div>
          <div>
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
      </div>
    </Modal>
  );
};

export default Login;
