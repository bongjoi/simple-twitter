import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import AuthTemplate from '../components/AuthTemplate';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      history.push('/');
    }
  }, [history, currentUser]);

  return (
    <AuthTemplate>
      <RegisterForm />
    </AuthTemplate>
  );
};

export default Register;
