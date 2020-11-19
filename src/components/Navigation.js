import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { projectAuth } from '../firebase/config';

const Navigation = () => {
  const history = useHistory();

  const onLogout = useCallback(() => {
    projectAuth.signOut();
    history.push('/');
  }, [history]);

  return (
    <div className="navigation-block">
      <Link to="/">
        <FontAwesomeIcon icon={faTwitter} />
        <span>Home</span>
      </Link>
      <Link to="/profile">
        <FontAwesomeIcon icon={faUser} />
        <span>Profile</span>
      </Link>
      <button className="logout-button" onClick={onLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Navigation;
