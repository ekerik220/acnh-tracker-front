import React from "react";
import { InputGroup, Button } from "react-bootstrap";
import styled from "styled-components";

export default function SearchBar() {
  return (
    <Wrapper>
      <SearchInput placeholder="Search" />
      <InputGroup.Append>
        <SearchButton variant="primary">
          <i className="fas fa-search"></i>
        </SearchButton>
      </InputGroup.Append>
    </Wrapper>
  );
}

const SearchInput = styled.input`
  border: 1px solid #edeff1;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  padding-left: 8px;
  width: 100%;

  @media (max-width: 500px) {
    font-size: 12px;
    width: 100%;
  }
`;

const SearchButton = styled(Button)`
  @media (max-width: 500px) {
    font-size: 12px;
  }
`;

const Wrapper = styled(InputGroup)`
  flex-wrap: nowrap;
  max-width: 500px;
  justify-content: flex-end;
`;
