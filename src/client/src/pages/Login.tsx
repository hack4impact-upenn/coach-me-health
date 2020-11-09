import { Field, FieldAttributes, Form, Formik } from 'formik';
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import auth from '../api/core/auth';

import '../styles/login.css'

const logo = require('../assets/images/coachme.png');

const FormContainer = styled.div`
  text-align: center;
  margin: 200px auto auto auto; 
  width: 100%;
`;

const initialValues = {
  email: '',
  password: '',
};

const inputStyles = {
  backgroundColor: "rgb(221, 225, 231)",
  borderRadius: "15px",
  padding: "8px 20px 8px 32px",
  border: "none",
  width: "100%"
}

const buttonStyles = {
  backgroundColor: "#F29DA4",
  borderRadius: "15px",
  fontWeight: 800
}

const FieldWrapper = ({
  children,
  icon,
}: {
  children: FieldAttributes<any>;
  icon?: string;
}) => {
  if (!icon) return children;

  return (
    <div className="field">
      <p className="control has-icons-left has-icons-right">
        {children}
        <span className="is-small is-left icon">
          <i className={`fas ${icon}`}></i>
        </span>
      </p>
    </div>
  );
};

const LoginForm = () => {
    const history = useHistory();

    const [isError, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState<null | string>(null);

    const handleSubmit = (values: IUserLogin) => {
        auth.login(values);
    };

    const loginComplete = ({ errorMessage }: { errorMessage?: any }) => {
        if (!errorMessage) {
            history.push('/dashboard');
        } else {
            setError(true);
            setErrorMsg(errorMessage.message);
        }
    };

    auth.addLoginSubscribers(loginComplete);

    return (
        <FormContainer>
            <h1 style = {{ fontWeight: 800, fontSize: 36, color: "#637792" }}>Login</h1>
            <p>Please enter your information below</p>

            { isError && 
                <p style = {{color: 'red'}}>{errorMsg}</p>
            }

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form>
                    <FieldWrapper icon="fa-envelope">
                        <Field
                        name="email"
                        style = {inputStyles}
                        type="text"
                        placeholder="Email"
                        className = "add-patient-field"
                        />
                    </FieldWrapper>

                    <FieldWrapper icon="fa-key">
                        <Field
                        name="password"
                        style = {inputStyles}
                        type="password"
                        placeholder="Password"
                        className = "add-patient-field"
                        />
                    </FieldWrapper>

                    <button style = {buttonStyles} className={"button is-primary"} type="submit">
                        Login
                    </button>
                </Form>
            </Formik>
        </FormContainer>
    )
}

const LogoContainer = () => {
    return (
        <div id = "logo-container">
            <img src = {logo} id = "logo"></img>
            <h1 id = "logo-subheader">Coach Dashboard</h1>
        </div>
    );
}

const Login = () => {
    return (
        <div>
            <div className="columns is-hidden-touch">
                <div className="column is-hidden-mobile" id = "logo-column">
                    <LogoContainer></LogoContainer>
                </div>
                <div className="column is-flex">
                    <LoginForm></LoginForm>
                </div>
            </div>
            <div className = "is-hidden-desktop">
                <LoginForm></LoginForm>
            </div>
        </div>
  );
};

export default Login;