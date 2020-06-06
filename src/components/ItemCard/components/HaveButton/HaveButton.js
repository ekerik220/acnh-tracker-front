import React, { useState } from "react";
import styled from "styled-components";
import { addItemToUserList, removeItemFromUserList } from "redux/slices";
import { useSelector, useDispatch } from "react-redux";

export default function HaveButton({
  itemName,
  itemCategory,
  itemVariation,
  variationList,
  selected,
}) {
  const loginToken = useSelector((state) => state.loginToken.token);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const item = {
    itemName,
    itemCategory,
    itemVariation,
    variationList,
  };

  const addToList = () => {
    setLoading(true);
    dispatch(addItemToUserList(loginToken, item)).then(() => setLoading(false));
  };

  const removeFromList = () => {
    setLoading(true);
    dispatch(removeItemFromUserList(loginToken, item)).then(() =>
      setLoading(false)
    );
  };

  return (
    <Button
      className={loading ? "loading" : selected ? "selected" : null}
      onClick={loading ? null : selected ? removeFromList : addToList}
    >
      {loading ? <i class="fas fa-spinner fa-spin"></i> : "Have"}
    </Button>
  );
}

const Button = styled.div`
  text-align: center;
  cursor: pointer;
  user-select: none;
  border: 1px solid #2ecc40;
  border-radius: 4px;
  margin: 1px;
  width: 100%;
  transition: all 0.5s;

  &.selected {
    background: #2ecc40;
  }

  &.loading {
    background: #2ecc40;
    opacity: 0.5;
  }
`;
