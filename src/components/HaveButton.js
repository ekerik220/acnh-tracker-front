import React from "react";
import styled from "styled-components";

export default function HaveButton() {
  return <Button>Have</Button>;
}

const Button = styled.div`
  text-align: center;
  cursor: pointer;
  user-select: none;
  background: grey;
  border: none;
  border-radius: 4px;
  margin: 1px;
  width: 100%;

  &:hover {
    background: rgba(0, 0, 0, 0.4);
    transition: background-color 0.2s;
  }
`;
