import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Pagination from "rc-pagination";
import "../rc-pagination.css";
import localeInfo from "../locale/en_US";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";

const ITEMS_PER_PAGE = 24;

export default function ItemBox({}) {
  const itemData = useSelector((state) => state.itemData);
  const [loadedData, setLoadedData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {}, []);

  useEffect(() => {
    const firstPage = itemData.slice(0, ITEMS_PER_PAGE);
    setLoadedData(firstPage);
    setPage(1);
  }, [itemData]);

  useEffect(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = page * ITEMS_PER_PAGE;
    const itemsToLoad = itemData.slice(startIndex, endIndex);
    setLoadedData(itemsToLoad);
  }, [page]);

  const changePage = (current) => {
    scroll.scrollToTop({ containerId: "content-area", duration: 500 });
    setPage(current);
  };

  return (
    <React.Fragment>
      {loadedData.length > 0 && (
        <TopArea>
          <div>
            <h3 id="title">Housewares</h3>
            <span>({itemData.length} total)</span>
          </div>
          <Pagination
            total={itemData.length}
            current={page}
            defaultPageSize={ITEMS_PER_PAGE}
            onChange={changePage}
            simple
            locale={localeInfo}
          />
        </TopArea>
      )}
      <ItemCardArea>
        {loadedData.map((item, index) => (
          <ItemCard key={index} item={item} />
        ))}
      </ItemCardArea>
      {loadedData.length > 0 && (
        <BottomArea>
          <Pagination
            total={itemData.length}
            current={page}
            defaultPageSize={ITEMS_PER_PAGE}
            onChange={changePage}
            simple
            locale={localeInfo}
          />
        </BottomArea>
      )}
    </React.Fragment>
  );
}

const TopArea = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

  div {
    display: flex;
    align-items: baseline;
  }

  h3 {
    margin-right: 10px;
  }
`;

const ItemCardArea = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 270px);
  grid-gap: 1rem;
  justify-content: center;
`;

const BottomArea = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 15px 0;
`;
