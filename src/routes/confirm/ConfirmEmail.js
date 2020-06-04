import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function ConfirmEmail() {
  const [loading, setLoading] = useState(false);
  const { userKey } = useParams();
  const message = useRef();

  useEffect(() => {
    async function confirmEmail() {
      const endpoint = "http://localhost:4000/user/confirm/" + userKey;

      try {
        setLoading(true);
        const req = await fetch(endpoint, { method: "POST" });
        const res = await req.json();
        setLoading(false);

        if (res.error) {
          message.current.classList.add("error");
          message.current.innerHTML = res.error;
          console.log(res.error);
        } else {
          message.current.innerHTML =
            'Email confirmed! Please <a href="/login">login</a>.';
        }
      } catch (err) {
        console.log(err);
        return;
      }
    }
    confirmEmail();
  }, [userKey]);

  return (
    <Wrapper>
      <h3>Confirm email</h3>
      <div>
        <span ref={message}>
          {loading && <i className="fas fa-cog fa-spin"></i>}
        </span>
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
