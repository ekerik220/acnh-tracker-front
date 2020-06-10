import React, { useState } from "react";
import styled from "styled-components";
import { Alert, Button, Form } from "react-bootstrap";
import { forgotPassword } from "api/backend";

function ForgotPassword() {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const closeAlert = () => {
    setError(null);
    setMessage(null);
  };

  const submit = (event) => {
    event.preventDefault();
    setLoading(true);
    forgotPassword(email).then((res) => {
      if (res.error) {
        setError(res.error);
        setMessage(null);
      } else if (res.message) {
        setMessage(res.message);
        setError(null);
      }
      setLoading(false);
    });
  };

  const handleInputChange = (event) => setEmail(event.target.value);

  return (
    <Wrapper>
      <Alert variant="danger" onClose={closeAlert} dismissible hidden={!error}>
        <p className="alert-text">{error}</p>
      </Alert>
      <Alert
        variant="success"
        onClose={closeAlert}
        dismissible
        hidden={!message}
      >
        <p className="alert-text">{message}</p>
      </Alert>
      <h3>Request Password Reset</h3>
      <div>
        <Form onSubmit={submit}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            {!loading ? "Submit" : <i class="fas fa-spinner fa-spin"></i>}
          </Button>
        </Form>
      </div>
    </Wrapper>
  );
}

export default ForgotPassword;

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
