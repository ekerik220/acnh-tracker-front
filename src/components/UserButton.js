import React from "react";
import { Dropdown } from "react-bootstrap";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setUserName, setLoginToken } from "../redux/actions";

export default function UserButton() {
  // If these are both non-null, then we are logged in
  const userName = useSelector((state) => state.userName);
  const loginToken = useSelector((state) => state.loginToken);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(setLoginToken(null));
  };

  return (
    <Dropdown>
      <DropdownToggle
        variant={userName && loginToken ? "primary" : "secondary"}
        className="ml-3"
      >
        <i className="fas fa-user"></i>
      </DropdownToggle>
      {userName && loginToken ? (
        <Dropdown.Menu>
          <Dropdown.Item disabled>{userName}</Dropdown.Item>
          <Dropdown.Item onSelect={logout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      ) : (
        <Dropdown.Menu>
          <Dropdown.Item href="/login">Login</Dropdown.Item>
          <Dropdown.Item href="/register">Register</Dropdown.Item>
        </Dropdown.Menu>
      )}
    </Dropdown>
  );
}

const DropdownToggle = styled(Dropdown.Toggle)`
  @media (max-width: 500px) {
    font-size: 12px;
  }
`;
