import React, { useState, useEffect } from "react";
import { InputGroup, Button } from "react-bootstrap";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setItemData, setSelectedItemType } from "../redux/actions";
import { withRouter } from "react-router-dom";

const SearchBar = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const allData = useSelector((state) => state.allData);
  const dispatch = useDispatch();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") search();
  };

  const search = () => {
    if (searchQuery.length < 2) return;
    props.history.push("/items");
    dispatch(setSelectedItemType(null));
    dispatch(setItemData([]));
    const searchItems = allData.filter((ele) =>
      ele.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    dispatch(setItemData([]));
    dispatch(setItemData(searchItems));
  };

  return (
    <Wrapper>
      <SearchInput
        value={searchQuery}
        placeholder="Search"
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <InputGroup.Append>
        <SearchButton type="submit" variant="primary" onClick={search}>
          <i className="fas fa-search"></i>
        </SearchButton>
      </InputGroup.Append>
    </Wrapper>
  );
};

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

export default withRouter(SearchBar);
