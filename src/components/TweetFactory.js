import React, { useContext } from 'react';
import UploadForm from './UploadForm';
import { AuthContext } from '../context/authContext';

const TweetFactory = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="tweet-factory-block">
      <UploadForm currentUser={currentUser} />
    </div>
  );
};

export default TweetFactory;
