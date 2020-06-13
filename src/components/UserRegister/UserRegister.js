import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Form, Button, Alert } from "react-bootstrap";
import { registerUser, resendConfirmationEmail } from "api/backend";

export default function UserRegister() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const errorText = useRef();

  const submit = (event) => {
    event.preventDefault();
    setLoading(true);
    registerUser(user, email, password).then((res) => {
      if (res.error) setError(res.error);
      else setFinished(true);
    });
  };

  const closeAlert = () => {
    setError(null);
    setSuccess(null);
  };

  const handleInvalidInput = (event) => {
    const ele = event.target;
    const regex = RegExp("^(?=[a-zA-Z0-9._-]*$)(?!.*[-_.]{2})[^-_.].*[^-_.]$");

    if (ele.value.length < 2) {
      ele.setCustomValidity("Should have 2 or more characters.");
    } else if (ele.value.length > 20) {
      ele.setCustomValidity("Should have 20 or less characters.");
    } else if (!regex.test(ele.value))
      ele.setCustomValidity(
        "Should have no spaces and no dashes/underscores/spaces at beginning or end."
      );
    else ele.setCustomValidity("");
  };

  const handleResendConfirmationEmail = (event) => {
    // If the success alert is showing don't send any more confirmation emails
    // This prevents massively spamming the link and sending a ton of emails.
    if (success) return;

    resendConfirmationEmail(email).then((res) => {
      if (res.error) setError(res.error);
      else setSuccess("Resent confirmation link!");
    });
  };

  if (!finished)
    return (
      <Wrapper>
        <Alert
          variant="danger"
          onClose={closeAlert}
          dismissible
          hidden={!error}
        >
          <p className="alert-text">{error}</p>
        </Alert>
        <h3>Register new user</h3>
        <div>
          <Form onSubmit={!loading ? submit : null}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>User name</Form.Label>
              <Form.Control
                type="text"
                placeholder="User name"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
                minLength={2}
                maxLength={20}
                pattern="^(?=[a-zA-Z0-9._-]*$)(?!.*[-_.]{2})[^-_.].*[^-_.]$"
                onInvalid={handleInvalidInput}
                onInput={(e) => e.target.setCustomValidity("")}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {!loading ? "Submit" : <i className="fas fa-spinner fa-spin"></i>}
            </Button>
          </Form>
        </div>
      </Wrapper>
    );

  if (finished)
    return (
      <Wrapper>
        <Alert
          variant="danger"
          onClose={closeAlert}
          dismissible
          hidden={!error}
        >
          <p className="alert-text" ref={errorText}></p>
        </Alert>
        <Alert
          variant="success"
          onClose={closeAlert}
          dismissible
          hidden={!success}
        >
          <p className="alert-text">{success}</p>
        </Alert>
        <h3>Confirm email</h3>
        <div>
          <p>
            We emailed a confirmation link to <b>{email}</b>! Please click on
            the link we emailed you to confirm your account. If you don't see
            it, check your spam folder.
          </p>
          <p>
            If you do not receive the email within a few minutes,{" "}
            <Link onClick={handleResendConfirmationEmail}>
              click here to resend
            </Link>{" "}
            it.
          </p>
        </div>
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

const Link = styled.span`
  cursor: pointer;
  color: blue;
  text-decoration: underline;
`;
