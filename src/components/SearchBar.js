import React from "react";
import { InputGroup, FormControl, Button, Form } from "react-bootstrap";
import styled from "styled-components";

export default function SearchBar() {
  return (
    <SizeLimiter>
      <InputGroup>
        <InputGroup.Prepend>
          <CategorySelect>
            <option>Wall-mounted</option>
            <option>...</option>
          </CategorySelect>
        </InputGroup.Prepend>
        <SearchInput placeholder="Search" />
        <InputGroup.Append>
          <Button variant="primary">
            <i class="fas fa-search"></i>
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </SizeLimiter>
  );
}

const SizeLimiter = styled.div`
  width: 100%;
  max-width: 600px;
`;

const CategorySelect = styled(Form.Control).attrs((props) => ({
  as: "select",
  custom: "true",
}))`
  @media (max-width: 768px) {
    font-size: 12px;
    width: 40px;
  }
`;

const SearchInput = styled(FormControl)`
  @media (max-width: 768px) {
  }
`;

const OpenSearchIcon = styled.i.attrs((props) => ({
  className: "fas fa-search",
}))`
  font-size: 20px;
  margin: 9px 0;
`;
