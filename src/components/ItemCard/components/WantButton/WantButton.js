import React, { useState } from "react";
import styled from "styled-components";
import {
  addItemToUserWishlist,
  removeItemFromUserWishlist,
} from "redux/slices";
import { useSelector, useDispatch } from "react-redux";

export default function WantButton({
  itemName,
  itemCategory,
  itemVariation,
  variationList,
  selected,
}) {
  const loginToken = useSelector((state) => state.loginToken);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const item = {
    itemName,
    itemCategory,
    itemVariation,
    variationList,
  };

  const addToWishlist = async () => {
    setLoading(true);
    dispatch(addItemToUserWishlist(loginToken, item)).then(() =>
      setLoading(false)
    );
  };

  const removeFromWishlist = async () => {
    setLoading(true);
    dispatch(removeItemFromUserWishlist(loginToken, item)).then(() =>
      setLoading(false)
    );
  };

  return (
    <Button
      className={loading ? "loading" : selected ? "selected" : null}
      onClick={loading ? null : selected ? removeFromWishlist : addToWishlist}
    >
      {loading ? <i class="fas fa-spinner fa-spin"></i> : "Want"}
    </Button>
  );
}

const Button = styled.div`
  text-align: center;
  cursor: pointer;
  user-select: none;
  border: 1px solid #0074d9;
  border-radius: 4px;
  margin: 1px;
  width: 100%;
  transition: all 0.5s;

  &.selected {
    background: #0074d9;
  }

  &.loading {
    background: #0074d9;
    opacity: 0.5;
  }
`;
