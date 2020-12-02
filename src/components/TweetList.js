import React, { useState, useEffect, useContext } from 'react';
import TweetItem from './TweetItem';
import { projectFirestore } from '../firebase/config';
import { AuthContext } from '../context/authContext';

const TweetList = () => {
  const { currentUser } = useContext(AuthContext);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    projectFirestore
      .collection('tweets')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const tweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTweets(tweetArray);
      });
  }, []);

  return (
    <div className="tweet-list-block">
      {tweets.map((tweet) => (
        <TweetItem
          key={tweet.id}
          tweetObj={tweet}
          isOwner={tweet.creatorId === currentUser.uid}
        />
      ))}
    </div>
  );
};

export default TweetList;
