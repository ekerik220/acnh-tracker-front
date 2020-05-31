import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Pagination from "rc-pagination";
import "../rc-pagination.css";
import localeInfo from "../locale/en_US";
import { animateScroll as scroll } from "react-scroll";

const ITEMS_PER_PAGE = 24;

export default function ItemBox({}) {
  const itemData = useSelector((state) => state.itemData);
  const selectedItemType = useSelector((state) => state.selectedItemType);
  const allData = useSelector((state) => state.allData);
  const [loadedData, setLoadedData] = useState([]);
  const [page, setPage] = useState(1);

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

  const formatTitle = (title) => {
    if (!title) return;
    if (title === "wallmounted") return "Wall-mounted";
    if (title === "dressup") return "Dress-up";
    if (title === "misc") return "Misc.";
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  return (
    <React.Fragment>
      {loadedData.length > 0 && (
        <TopArea>
          <div>
            <h3 id="title">
              {selectedItemType ? formatTitle(selectedItemType) : "Search"}
            </h3>
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
        {!allData && (
          <div className="loading-spinner">
            <i className="fas fa-cog fa-spin"></i>
          </div>
        )}
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

  @media (max-width: 460px) {
    h3 {
      font-size: 20px;
      margin-right: 0;
    }

    div {
      flex-direction: column;
    }
  }
`;

const ItemCardArea = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 270px);
  grid-gap: 1rem;
  justify-content: center;

  .loading-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .loading-spinner > i {
    font-size: 10vw;
  }
`;

const BottomArea = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 15px 0;
`;
