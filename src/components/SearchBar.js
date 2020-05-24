import React, { useState } from "react";
import { InputGroup, Button } from "react-bootstrap";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setLoading, setItemData, setSelectedItemType } from "../redux/actions";
import { withRouter } from "react-router-dom";

const SearchBar = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") search();
  };

  const search = async () => {
    if (searchQuery.length < 2) return;

    dispatch(setItemData([]));
    dispatch(setSelectedItemType(null));
    setSearchQuery("");

    try {
      dispatch(setLoading(true));
      props.history.push("/items");
      const endpoint = "http://localhost:4000/data/search?s=" + searchQuery;
      const response = await fetch(endpoint);
      const data = await response.json();
      dispatch(setItemData(data));
      if (data.length === 0) props.history.push("/noresults");
    } catch (err) {
      console.log(err);
    }
    dispatch(setLoading(false));
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
