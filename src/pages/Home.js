import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div>
      <p>{currentUser.email}</p>
      <p>{currentUser.displayName}</p>
    </div>
  );
};

export default Home;
