import React, { useState, useEffect } from "react";
import { InputGroup, Button } from "react-bootstrap";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setItemData, setSelectedItemType } from "redux/slices";
import { withRouter } from "react-router-dom";

const SearchBar = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState("");
  const allData = useSelector((state) => state.allData.list);
  const dispatch = useDispatch();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") search();
  };

  const search = () => {
    if (searchInput.length < 2) return;
    props.history.push("/items");
    const searchItems = allData.filter((item) =>
      item.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    dispatch(setSelectedItemType(null));
    dispatch(setItemData([]));
    setSearchData(searchItems);
  };

  useEffect(() => {
    dispatch(setItemData(searchData));
  }, [dispatch, searchData]);

  return (
    <Wrapper>
      <SearchInput
        value={searchInput}
        placeholder="Search"
        onChange={(e) => setSearchInput(e.target.value)}
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
