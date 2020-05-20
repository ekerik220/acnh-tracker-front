import React from "react";
import styled from "styled-components";
import { Accordion, Card, Collapse, Col } from "react-bootstrap";
import { useState } from "react";

export default function SideNav() {
  const [open, setOpen] = useState(true);

  return (
    <NavContainer>
      <Navigation>
        <NavCategory>
          <Navigation.Toggle as={NavCategory.Header} eventKey="0">
            Click me!
          </Navigation.Toggle>
          <Navigation.Collapse eventKey="0">
            <NavDropdownArea>
              <NavLinkList>
                <li data-toggle="collapse" data-target=".sidebar-collapse">
                  test
                </li>
                <li>test</li>
                <li>test</li>
              </NavLinkList>
            </NavDropdownArea>
          </Navigation.Collapse>
        </NavCategory>
        <NavCategory>
          <Navigation.Toggle as={NavCategory.Header} eventKey="1">
            Click me!
          </Navigation.Toggle>
          <Navigation.Collapse eventKey="1">
            <NavDropdownArea>
              <NavLinkList>
                <li>test</li>
                <li>test</li>
                <li>test</li>
              </NavLinkList>
            </NavDropdownArea>
          </Navigation.Collapse>
        </NavCategory>
      </Navigation>
    </NavContainer>
  );
}

// Styles
const NavContainer = styled.div`
  border-right: 2px solid black;
  height: 100vh;
  display: flex;
  position: fixed;
  background: white;
  z-index: 1;
`;

const Navigation = styled(Accordion)`
  width: 200px;
`;

const NavCategory = styled(Card)`
  color: green;
`;

const NavDropdownArea = styled(Card.Body)`
  background: rgba(0, 0, 0, 0.2);
  padding: 0;
`;

const NavLinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  & li {
    color: red;
  }
`;
