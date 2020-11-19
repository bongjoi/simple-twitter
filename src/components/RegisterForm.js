import React, { useCallback, useState } from 'react';
import AuthForm from './AuthForm';
import { firebaseInstance, projectAuth } from '../firebase/config';
import useInput from '../hooks/useInput';

const RegisterForm = () => {
  const [form, onChange] = useInput({
    email: '',
    password: '',
    username: '',
  });
  const [error, setError] = useState('');

  const onSubmitEmail = useCallback(
    (email, password, username) => async (e) => {
      e.preventDefault();
      try {
        const { user } = await projectAuth.createUserWithEmailAndPassword(
          email,
          password,
        );
        await user.updateProfile({ ...user, displayName: username });
      } catch (error) {
        console.error(error);
        setError('회원가입 실패');
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
      setError('회원가입 실패');
    }
  }, []);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmitEmail={onSubmitEmail}
      onSubmitGoogle={onSubmitGoogle}
      error={error}
    />
  );
};

export default RegisterForm;
