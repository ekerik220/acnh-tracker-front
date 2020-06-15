import React from "react";
import styled from "styled-components";
import { Image } from "react-bootstrap";
import { setItemData, setSelectedItemType } from "redux/slices";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function Logo(props) {
  const dispatch = useDispatch();
  const routerHistory = useHistory();

  const handleClick = () => {
    routerHistory.push("/");
    dispatch(setItemData([]));
    dispatch(setSelectedItemType(null));
  };

  return (
    <ImageBox onClick={handleClick}>
      <Image src="https://terimeos.sirv.com/Images/logo.png" fluid></Image>
    </ImageBox>
  );
}

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
