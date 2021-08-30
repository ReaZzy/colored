import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/reducers/auth/thunks';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [userLogin, setUserLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleSubmit = async () => {
    await dispatch(await login(userLogin, password));
    setUserLogin('');
    setPassword('');
    await router.push('/');
  };
  return (
    <div>
      <input
        value={userLogin}
        onChange={(e) => setUserLogin(e.currentTarget.value)}
      />
      <input
        type={'password'}
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <button type={'submit'} onClick={handleSubmit}>
        Login 🔐
      </button>
    </div>
  );
};

export default Login;
