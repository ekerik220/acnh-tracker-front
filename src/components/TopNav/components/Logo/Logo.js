import React from "react";
import styled from "styled-components";
import { Image } from "react-bootstrap";
import { setItemData, setSelectedItemType } from "redux/actions";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

const Logo = (props) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    props.history.push("/");
    dispatch(setItemData([]));
    dispatch(setSelectedItemType(null));
  };

  return (
    <ImageBox onClick={handleClick}>
      <Image src={require("assets/logo.png")} fluid></Image>
    </ImageBox>
  );
};

const ImageBox = styled.div`
  position: absolute;
  top: 7px;
  left: 39px;
  width: 100px;
  cursor: pointer;
  z-index: 1;

  @media (max-width: 768px) {
    display: none;
  }
`;

export default withRouter(Logo);
