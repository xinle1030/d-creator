import logo200Image from '../assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import {signin, signup} from '../redux/auth/actions';
import { useDispatch, useSelector } from "react-redux";

const AuthForm = (props) => {

  console.log(props)

  const [authDetails, setAuthDetails] = useState({
    name: '',
    email: '',
    username: '',
    role: '',
    password: '',
  });

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      props.handleModalClose();
      window.location.reload();
    }
  }, [userInfo]);

  const isLogin = () => {
    return props.authState === STATE_LOGIN;
  }

  const isSignup = () => {
    return props.authState === STATE_SIGNUP;
  }

  const changeAuthState = authState => event => {
    event.preventDefault();

    props.onChangeAuthState(authState);
  };

  const handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setAuthDetails({
      ...authDetails,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(props.authState);
    console.log(authDetails);

    let apiParam = '';

      if (isSignup()) {
          dispatch(signup(authDetails));
          console.log(userInfo)
      }
      else{
        dispatch(signin(authDetails));
        console.log(userInfo)
      }
  };

  const renderButtonText = () => {
    const { buttonText } = props;

    if (!buttonText && isLogin()) {
      return 'Login';
    }

    if (!buttonText && isSignup()) {
      return 'Signup';
    }

    return buttonText;
  }

    const {
      showLogo,
      nameLabel,
      nameInputProps,
      emailLabel,
      emailInputProps,
      usernameLabel,
      usernameInputProps,
      passwordLabel,
      passwordInputProps,
      confirmPasswordLabel,
      confirmPasswordInputProps,
      children,
      onLogoClick,
    } = props;

    return (
      <Form onSubmit={handleSubmit}>
        {showLogo && (
          <div className="text-center pb-4">
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: 60, height: 60, cursor: 'pointer' }}
              alt="logo"
              onClick={onLogoClick}
            />
          </div>
        )}
        {isSignup() && (
          <FormGroup>
            <Label for={nameLabel}>{nameLabel}</Label>
            <Input
              {...nameInputProps}
              name="name"
              value={authDetails.name}
              onChange={handleInputChange}
            />
          </FormGroup>
        )}
        <FormGroup>
          <Label for={usernameLabel}>{usernameLabel}</Label>
          <Input
            {...usernameInputProps}
            name="username"
            value={authDetails.username}
            onChange={handleInputChange}
          />
        </FormGroup>
        {isSignup() && (
          <div>
            <FormGroup>
              <Label for={emailLabel}>{emailLabel}</Label>
              <Input
                {...emailInputProps}
                name="email"
                value={authDetails.email}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelectMulti">Select your role:</Label>
              <Input
                type="select"
                name="role"
                multiple
                onChange={handleInputChange}
              >
                <option value="creator">Creator</option>
                <option value="advertiser">Advertiser</option>
              </Input>
            </FormGroup>
          </div>
        )}
        <FormGroup>
          <Label for={passwordLabel}>{passwordLabel}</Label>
          <Input
            {...passwordInputProps}
            name="password"
            value={authDetails.password}
            onChange={handleInputChange}
          />
        </FormGroup>
        {isSignup() && (
          <FormGroup>
            <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
            <Input
              {...confirmPasswordInputProps}
              name="confirmPassword"
              value={authDetails.confirmPassword}
            />
          </FormGroup>
        )}
        <FormGroup check>
          <Label check>
            <Input type="checkbox" />{' '}
            {isSignup() ? 'Agree the terms and policy' : 'Remember me'}
          </Label>
        </FormGroup>
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={handleSubmit}
        >
          {renderButtonText()}
        </Button>

        <div className="text-center pt-1">
          <h6>or</h6>
          <h6>
            {isSignup() ? (
              <a href="#login" onClick={changeAuthState(STATE_LOGIN)}>
                Login
              </a>
            ) : (
              <a href="#signup" onClick={changeAuthState(STATE_SIGNUP)}>
                Signup
              </a>
            )}
          </h6>
        </div>

        {children}
      </Form>
    );
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

AuthForm.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  nameLabel: PropTypes.string,
  nameInputProps: PropTypes.object,
  emailLabel: PropTypes.string,
  emailInputProps: PropTypes.object,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  nameLabel: 'Name',
  nameInputProps: {
    type: 'string',
    placeholder: 'your name',
  },
    emailLabel: 'Email',
  emailInputProps: {
    type: 'email',
    placeholder: 'your email',
  },
  usernameLabel: 'Username',
  usernameInputProps: {
    type: 'string',
    placeholder: 'your username',
  },
  passwordLabel: 'Password',
  passwordInputProps: {
    type: 'password',
    placeholder: 'your password',
  },
  confirmPasswordLabel: 'Confirm Password',
  confirmPasswordInputProps: {
    type: 'password',
    placeholder: 'confirm your password',
  },
  onLogoClick: () => {},
};

export default AuthForm;