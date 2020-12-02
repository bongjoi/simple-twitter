import React from 'react';
import moment from 'moment';
import 'moment/locale/ko';

moment.locale('ko');

const TweetItem = ({ tweetObj, isOwner }) => {
  return (
    <div className="tweet-item-block">
      <div className="header">
        <p>{tweetObj.creatorName}</p>
      </div>
      <div className="body">
        {tweetObj.imageUrl && (
          <div className="image-area">
            <img src={tweetObj.imageUrl} alt="" />
          </div>
        )}
        <div className="text-area">
          <p className="content">{tweetObj.text}</p>
          <p className="time">{moment(tweetObj.createdAt).fromNow()}</p>
        </div>
      </div>
    </div>
  );
};

export default TweetItem;
