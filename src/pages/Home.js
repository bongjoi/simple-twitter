import React from 'react';
import Navigation from '../components/Navigation';
import TweetFactory from '../components/TweetFactory';

const Home = () => {
  return (
    <div className="home-block">
      <div className="home-inner">
        <Navigation />
        <TweetFactory />
      </div>
    </div>
  );
};

export default Home;
