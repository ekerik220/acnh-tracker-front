import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import styled from "styled-components";

export default function UserButton() {
  return (
    <Dropdown>
      <DropdownToggle variant="secondary" className="ml-3">
        <i class="fas fa-user"></i>
      </DropdownToggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

const DropdownToggle = styled(Dropdown.Toggle)`
  @media (max-width: 500px) {
    font-size: 12px;
  }
`;
