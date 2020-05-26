import React from "react";
import { Dropdown } from "react-bootstrap";
import styled from "styled-components";

export default function UserButton() {
  return (
    <Dropdown>
      <DropdownToggle variant="secondary" className="ml-3">
        <i className="fas fa-user"></i>
      </DropdownToggle>
      <Dropdown.Menu>
        <Dropdown.Item href="/register">Register</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

const DropdownToggle = styled(Dropdown.Toggle)`
  @media (max-width: 500px) {
    font-size: 12px;
  }
`;
