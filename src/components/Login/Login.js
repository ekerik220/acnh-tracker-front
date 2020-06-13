import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Form, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, resetLoginError } from "redux/slices";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const routerHistory = useHistory();
  const error = useSelector((state) => state.loginToken.error);
  const token = useSelector((state) => state.loginToken.token);

  const submit = (event) => {
    event.preventDefault();
    setLoading(true);
    dispatch(login(email, password)).then(() => {
      setLoading(false);
    });
  };

  const closeAlert = () => dispatch(resetLoginError());
  const handleEmailInputChange = (event) => setEmail(event.target.value);
  const handlePasswordInputChange = (event) => setPassword(event.target.value);

  useEffect(() => {
    if (token) routerHistory.push("/");
  });

  return (
    <Wrapper>
      <Alert variant="danger" onClose={closeAlert} dismissible hidden={!error}>
        <p className="alert-text">{error}</p>
      </Alert>
      <h3>Login</h3>
      <div>
        <Form onSubmit={submit}>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailInputChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordInputChange}
              minLength={6}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            {!loading ? "Submit" : <i className="fas fa-spinner fa-spin"></i>}
          </Button>
        </Form>
      </div>
      <a href="/forgotpassword">I forgot my password.</a>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;

  .alert-text {
    padding: 0;
    margin: 0;
  }

  .error {
    color: red;
  }

  h3 {
    margin-top: 30px;
  }

  & > div {
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    padding: 30px;
    max-width: 500px;
  }
`;
