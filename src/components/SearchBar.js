import React from "react";
import { InputGroup, Button } from "react-bootstrap";
import styled from "styled-components";

export default function SearchBar() {
  return (
    <Wrapper>
      <InputGroup.Prepend>
        <CategorySelect>
          <option>Wall-mounted</option>
          <option>...</option>
        </CategorySelect>
      </InputGroup.Prepend>
      <SearchInput placeholder="Search" />
      <InputGroup.Append>
        <SearchButton variant="primary">
          <i class="fas fa-search"></i>
        </SearchButton>
      </InputGroup.Append>
    </Wrapper>
  );
}

const CategorySelect = styled.select`
  border: 1px solid #edeff1;
  border-radius: 3px;
  padding: 5px;
  background: white;

  @media (max-width: 430px) {
    width: 70px;
  }

  @media (max-width: 500px) {
    font-size: 12px;
  }
`;

const SearchInput = styled.input`
  border: 1px solid #edeff1;
  padding-left: 8px;
  width: 100%;

  @media (max-width: 500px) {
    font-size: 12px;
    width: 50%;
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
