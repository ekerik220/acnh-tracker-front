import React from "react";
import ItemCard from "./ItemCard";
import styled from "styled-components";

export default function ItemBox() {
  return (
    <Wrapper>
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 270px);
  grid-gap: 1rem;
  justify-content: center;
`;
