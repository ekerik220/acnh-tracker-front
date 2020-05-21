import React from "react";
import { InputGroup, FormControl, Button, Form } from "react-bootstrap";
import styled from "styled-components";

export default function SearchBar() {
  return (
    <Wrapper>
      <InputGroup>
        <InputGroup.Prepend>
          <CategorySelect as="select" custom>
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
      </InputGroup>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
`;

const CategorySelect = styled(Form.Control)`
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const SearchInput = styled(FormControl)`
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const SearchButton = styled(Button)`
  font-size: 12px;
`;
