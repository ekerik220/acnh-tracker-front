import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setPopupData } from "redux/slices";
import styled from "styled-components";
import { FrontSide, BackSide } from "./components";

export default function ItemCard({ itemData, closeButton = false }) {
  const dispatch = useDispatch();
  const [wanted, setWanted] = useState(false);
  const [owned, setOwned] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const infoPanelToggle = () => setShowInfo(!showInfo);

  return (
    <OuterBox>
      <TagBox className={owned ? "owned" : wanted ? "wanted" : null}>
        <i class="fas fa-info-circle" onClick={infoPanelToggle}></i>
        <i
          class="far fa-times-circle"
          onClick={() => dispatch(setPopupData(null))}
          hidden={!closeButton}
        ></i>
      </TagBox>
      {!showInfo ? (
        <FrontSide
          itemData={itemData}
          owned={owned}
          wanted={wanted}
          setOwned={setOwned}
          setWanted={setWanted}
        />
      ) : (
        <BackSide itemData={itemData}></BackSide>
      )}
    </OuterBox>
  );
}

const OuterBox = styled.div`
  border: 1px solid black;
  border-radius: 4px;
  width: 270px;
  height: 320px;
  font-family: "Roboto", sans-serif;
`;

const TagBox = styled.div`
  background: grey;
  height: 25px;
  transition: background-color 0.5s;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  i {
    cursor: pointer;
    color: white;
    margin-right: 5px;
  }

  i:hover {
    color: black;
  }

  &.owned {
    background: #2ecc40;
  }

  &.wanted {
    background: #0074d9;
  }
`;
