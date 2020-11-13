import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return <div>Home Page</div>;
};

export default Home;
