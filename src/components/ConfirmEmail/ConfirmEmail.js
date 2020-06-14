import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { confirmEmail } from "api/backend";

export default function ConfirmEmail() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const { userKey } = useParams();

  useEffect(() => {
    setLoading(true);
    confirmEmail(userKey).then((res) => {
      setLoading(false);
      if (res.error) setError(res.error);
      else setConfirmed(true);
    });
  }, [userKey]);

  return (
    <Wrapper>
      <h3>Confirm email</h3>
      <div>
        {loading ? (
          <span>
            <i className="fas fa-cog fa-spin"></i>
          </span>
        ) : confirmed ? (
          <span>
            Email confirmed! Please <a href="/login">login</a>.
          </span>
        ) : error ? (
          <span className="error">{error}</span>
        ) : null}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;

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

  i {
    font-size: 30px;
  }
`;
