import React from "react";
import { Dropdown } from "react-bootstrap";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "redux/slices";

export default function UserButton() {
  const userName = useSelector((state) => state.user.name);
  const loginToken = useSelector((state) => state.loginToken.token);
  const routerHistory = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    routerHistory.push("/");
    dispatch(logout());
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
          <Dropdown.Item href="/catalogue">Catalogue</Dropdown.Item>
          <Dropdown.Item href="/wishlist">Wishlist</Dropdown.Item>
          <Dropdown.Item href="/compare">Compare catalogues</Dropdown.Item>
          <Dropdown.Item onSelect={handleLogout}>Logout</Dropdown.Item>
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
