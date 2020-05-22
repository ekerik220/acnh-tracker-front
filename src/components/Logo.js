import React from "react";
import styled from "styled-components";
import { Image } from "react-bootstrap";

export default function Logo() {
  return (
    <ImageBox>
      <Image src={require("../assets/logo.png")} fluid></Image>
    </ImageBox>
  );
}

const ImageBox = styled.div`
  position: absolute;
  top: 7px;
  left: 39px;
  width: 100px;

  @media (max-width: 768px) {
    display: none;
  }
`;
