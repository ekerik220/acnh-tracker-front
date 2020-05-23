import React from "react";
import ItemCard from "./ItemCard";
import styled from "styled-components";
import { useSelector } from "react-redux";

export default function ItemBox() {
  const itemData = useSelector((state) => state.itemData);

  return (
    <Wrapper>
      {itemData.map((item, index) => (
        <ItemCard key={index} item={item} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 270px);
  grid-gap: 1rem;
  justify-content: center;
`;
