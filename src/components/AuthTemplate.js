import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

const AuthTemplate = ({ children }) => {
  return (
    <div className="auth-block">
      <div className="white-box">
        <div className="logo-area">
          <FontAwesomeIcon icon={faTwitter} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthTemplate;
