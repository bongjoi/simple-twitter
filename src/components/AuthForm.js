import React from 'react';
import { Link } from 'react-router-dom';

const textMap = {
  login: '로그인',
  register: '회원가입',
};

const AuthForm = ({
  type,
  form,
  onChange,
  onSubmitEmail,
  onSubmitGoogle,
  error,
}) => {
  const text = textMap[type];
  const { email, username, password } = form;

  return (
    <div className="auth-form-block">
      <h2>{text}</h2>
      <form>
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={email}
          onChange={onChange}
          required
        />
        {type === 'register' && (
          <input
            type="text"
            name="username"
            placeholder="이름"
            value={username}
            onChange={onChange}
            required
          />
        )}
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={password}
          onChange={onChange}
          required
        />
        {error && <p className="error">{error}</p>}
        <button
          className="email-button"
          onClick={
            username
              ? onSubmitEmail(email, password, username)
              : onSubmitEmail(email, password)
          }
        >
          {text}
        </button>
      </form>
      <div className="divider">OR</div>
      <div className="social-button">
        <button className="google-button" onClick={onSubmitGoogle}>
          Google로 계속하기
        </button>
      </div>
      <div className="link">
        {type === 'login' ? (
          <Link to="/register">회원가입</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
