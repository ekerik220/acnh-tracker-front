import React from "react";
import styled from "styled-components";
import { CatalogueItem } from "./CatalogueItem";

export default function CatalogueItemArea({ displayedList }) {
  return (
    <Wrapper>
      {displayedList.map((item, index) => (
        <CatalogueItem key={index} item={item} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  border: 1px solid black;
  overflow-y: auto;
`;
