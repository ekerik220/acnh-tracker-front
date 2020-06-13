import React from "react";
import styled from "styled-components";

export default function NoResults() {
  return <NoResultsContainer>No results!</NoResultsContainer>;
}

const NoResultsContainer = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
`;
