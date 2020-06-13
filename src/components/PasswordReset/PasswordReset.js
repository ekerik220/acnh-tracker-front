import React, { useState } from "react";
import styled from "styled-components";
import { Alert, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { changePassword } from "api/backend";

function PasswordReset() {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useParams();

  const closeAlert = () => {
    setError(null);
    setMessage(null);
  };

  const submit = (event) => {
    event.preventDefault();
    setLoading(true);
    changePassword(token, password).then((res) => {
      if (res.error) {
        setError(res.error);
        setMessage(null);
      } else if (res.message) {
        setMessage(res.message);
        setSuccess(true);
        setError(null);
      }
      setLoading(false);
    });
  };

  const handlePasswordInputChange = (event) => setPassword(event.target.value);

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
      <h3>Password Reset</h3>
      <div>
        <Form onSubmit={submit}>
          <Form.Group>
            <Form.Label>New password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={handlePasswordInputChange}
              disabled={success}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading || success}>
            {!loading ? "Submit" : <i class="fas fa-spinner fa-spin"></i>}
          </Button>
        </Form>
      </div>
    </Wrapper>
  );
}

export default PasswordReset;

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
