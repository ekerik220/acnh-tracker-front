import React, { useState } from "react";
import styled from "styled-components";
import { setItemData, setErrorText } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";

export default function WantButton(props) {
  const loginToken = useSelector((state) => state.loginToken);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const addToWishList = async () => {
    const endpoint = "http://localhost:4000/list/addToWishList";
    const body = {
      item_name: props.itemName,
      category: props.itemCategory,
      variation:
        props.itemVariation.name === "NA" ? null : props.itemVariation.name,
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json", "auth-token": loginToken },
      body: JSON.stringify(body),
    };

    try {
      const req = await fetch(endpoint, options);
      const res = await req.json();
      console.log(res);
      if (res.error) dispatch(setErrorText(res.error));
    } catch (err) {
      console.log(err);
    }
  };

  return <Button onClick={addToWishList}>Want</Button>;
}

const Button = styled.div`
  text-align: center;
  cursor: pointer;
  user-select: none;
  border: 1px solid #0074d9;
  border-radius: 4px;
  margin: 1px;
  width: 100%;
`;
