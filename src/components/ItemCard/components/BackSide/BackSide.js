import React from "react";
import styled from "styled-components";

function BackSide({ itemData }) {
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formatBuyPrice = (price) => (price === "NFS" ? "Not for sale" : price);

  return (
    <Wrapper>
      <h4>{capitalize(itemData.name)}</h4>
      {itemData.diy && (
        <Section>
          <Header>DIY:</Header>
          <Details>{itemData.diy}</Details>
        </Section>
      )}
      {itemData.source && (
        <Section>
          <Header>Source:</Header>
          <Details>{itemData.source}</Details>
        </Section>
      )}
      {itemData.sourceNotes && (
        <Section>
          <Header>Notes:</Header>
          <Details>{itemData.sourceNotes}</Details>
        </Section>
      )}
      {itemData.buy && (
        <Section>
          <Header>Buy:</Header>
          <Details>{formatBuyPrice(itemData.buy)}</Details>
        </Section>
      )}
      {itemData.sell && (
        <Section>
          <Header>Sell:</Header>
          <Details>{itemData.sell}</Details>
        </Section>
      )}
    </Wrapper>
  );
}

export default BackSide;

const Wrapper = styled.div`
  padding: 10px;
`;

const Section = styled.div`
  display: flex;
`;

const Header = styled.span`
  text-decoration: underline;
  font-weight: 700;
  margin-right: 5px;
`;

const Details = styled.span`
  text-decoration: none;
  font-weight: 400;
`;
