import React from 'react';
import Navigation from '../components/Navigation';
import TweetFactory from '../components/TweetFactory';
import TweetList from '../components/TweetList';

const Home = () => {
  return (
    <div className="home-block">
      <div className="home-inner">
        <Navigation />
        <TweetFactory />
        <TweetList />
      </div>
    </div>
  );
};

export default Home;
