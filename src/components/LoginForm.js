import React, { useCallback, useState } from 'react';
import AuthForm from './AuthForm';
import { firebaseInstance, projectAuth } from '../firebase/config';
import useInput from '../hooks/useInput';

const LoginForm = () => {
  const [form, onChange] = useInput({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const onSubmitEmail = useCallback(
    (email, password) => async (e) => {
      e.preventDefault();
      try {
        await projectAuth.signInWithEmailAndPassword(email, password);
      } catch (error) {
        console.error(error);
        setError('로그인 실패');
      }
    },
    [],
  );

  const onSubmitGoogle = useCallback(async (e) => {
    e.preventDefault();
    try {
      const provider = new firebaseInstance.auth.GoogleAuthProvider();
      await projectAuth.signInWithPopup(provider);
    } catch (error) {
      console.error(error);
      setError('로그인 실패');
    }
  }, []);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmitEmail={onSubmitEmail}
      onSubmitGoogle={onSubmitGoogle}
      error={error}
    />
  );
};

export default LoginForm;
