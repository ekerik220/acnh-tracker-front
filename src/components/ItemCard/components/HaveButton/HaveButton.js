import React, { useState } from "react";
import styled from "styled-components";
import {
  setItemData,
  setErrorText,
  setUserWishlist,
  setUserList,
} from "../../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

export default function WantButton(props) {
  const loginToken = useSelector((state) => state.loginToken);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const addToWishList = async () => {
    postToEndpoint("http://localhost:4000/list/addToList");
  };

  const removeFromWishList = async () => {
    postToEndpoint("http://localhost:4000/list/listDelete");
  };

  const postToEndpoint = async (endpoint) => {
    const body = {
      item_name: props.itemName,
      category: props.itemCategory,
      variation:
        props.itemVariation.name === "NA" ? null : props.itemVariation.name,
      variationList: props.variationList.map((v) => v.name),
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json", "auth-token": loginToken },
      body: JSON.stringify(body),
    };

    try {
      setLoading(true);
      const req = await fetch(endpoint, options);
      const res = await req.json();
      setLoading(false);
      console.log(res);
      if (res.error) dispatch(setErrorText(res.error));
      else {
        dispatch(setUserWishlist(res.wishList));
        dispatch(setUserList(res.list));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Button
      className={loading ? "loading" : props.selected ? "selected" : null}
      onClick={
        loading ? null : props.selected ? removeFromWishList : addToWishList
      }
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