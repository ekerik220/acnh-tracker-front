import React, { useState } from "react";
import styled from "styled-components";
import {
  addItemToUserWishlist,
  removeItemFromUserWishlist,
} from "redux/slices";
import { useSelector, useDispatch } from "react-redux";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function WantButton({
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

  const addToWishlist = () => {
    setLoading(true);
    dispatch(addItemToUserWishlist(loginToken, item)).then(() =>
      setLoading(false)
    );
  };

  const removeFromWishlist = () => {
    setLoading(true);
    dispatch(removeItemFromUserWishlist(loginToken, item)).then(() =>
      setLoading(false)
    );
  };

  return (
    <OverlayTrigger
      placement="bottom"
      overlay={!loginToken ? <Tooltip>Must be logged in</Tooltip> : <div></div>}
    >
      <Button
        className={loading ? "loading" : selected ? "selected" : null}
        onClick={loading ? null : selected ? removeFromWishlist : addToWishlist}
      >
        {loading ? <i className="fas fa-spinner fa-spin"></i> : "Want"}
      </Button>
    </OverlayTrigger>
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
