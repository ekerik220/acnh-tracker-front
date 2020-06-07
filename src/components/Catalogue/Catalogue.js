import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemTotals } from "redux/slices";
import { ItemCard } from "components/ItemCard";
import {
  CircularProgress,
  CatalogueItemArea,
  CategorySelect,
} from "./components";

export default function Catalogue() {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.user.list);
  const popupData = useSelector((state) => state.popupData);
  const category = useSelector((state) => state.catalogue.category);
  const itemTotals = useSelector((state) => state.itemTotals.totals);

  const [displayedList, setDisplayedList] = useState(userList);
  const [currentTotal, setCurrentTotal] = useState(1);
  const [currentTotalVariations, setCurrentTotalVariations] = useState(1);

  const totalVariations = (data) => {
    let count = 0;
    data.forEach((ele) => {
      if (ele.variations.length > 0) count += ele.variations.length;
      else count++;
    });
    return count;
  };

  useEffect(() => {
    dispatch(fetchItemTotals());
  }, [dispatch]);

  useEffect(() => {
    if (category === "all") {
      setDisplayedList(userList);
    } else {
      const filteredList = userList.filter(
        (item) => item.category === category
      );
      setDisplayedList(filteredList);
    }
    setCurrentTotal(itemTotals[category] || 1);
    setCurrentTotalVariations(itemTotals[category + "_v"] || 1);
  }, [category, userList]);

  return (
    <Wrapper>
      {popupData && (
        <div className="popup-card">
          <ItemCard itemData={popupData} closeButton={true} />
        </div>
      )}
      <ListSection>
        <h3>Catalogue</h3>
        <CategorySelect />
        <CatalogueItemArea displayedList={displayedList} />
      </ListSection>
      <ProgressBarSection>
        <div>
          <CircularProgress
            percent={(displayedList.length / currentTotal) * 100}
            tooltip={`${displayedList.length} / ${currentTotal}`}
            label="Items"
          ></CircularProgress>
        </div>
        <div>
          <CircularProgress
            percent={
              (totalVariations(displayedList) / currentTotalVariations) * 100
            }
            tooltip={`${totalVariations(
              displayedList
            )} / ${currentTotalVariations}`}
            label="Variations"
          ></CircularProgress>
        </div>
      </ProgressBarSection>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  position: relative;

  .popup-card {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: white;
    z-index: 4;
  }

  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

const ProgressBarSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 50px;
  width: 100%;

  div {
    width: 200px;
  }

  @media (max-width: 550px) {
    flex-direction: row;

    div {
      width: 140px;
    }
  }
`;

const ListSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
