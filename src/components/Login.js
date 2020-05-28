import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Form, Button, Alert } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoginToken, setUserName } from "../redux/actions";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const errorText = useRef();
  const dispatch = useDispatch();

  const submit = async (event) => {
    event.preventDefault();

    const endpoint = "http://localhost:4000/user/login";
    const body = {
      email: email,
      password: password,
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    try {
      setLoading(true);
      const req = await fetch(endpoint, options);
      const res = await req.json();
      setLoading(false);
      if (res.error) {
        errorText.current.innerHTML = res.error;
        setErrorVisible(true);
      } else {
        dispatch(setLoginToken(res.token));
        dispatch(setUserName(res.user));
        props.history.push("/");
      }
    } catch (err) {
      console.log(err);
      return;
    }
  };

  return (
    <Wrapper>
      <Alert
        variant="danger"
        onClose={() => setErrorVisible(false)}
        dismissible
        hidden={!errorVisible}
      >
        <p className="alert-text" ref={errorText}></p>
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
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minlength={6}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            {!loading ? "Submit" : <i class="fas fa-spinner fa-spin"></i>}
          </Button>
        </Form>
      </div>
      <span>I forgot my password.</span>
    </Wrapper>
  );
};

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

export default withRouter(Login);
