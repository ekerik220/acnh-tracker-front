import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { Logo, SideMenuToggle, SearchBar, UserButton } from "./components";

function TopNav() {
  return (
    <StyledContainer fluid className="bg-dark py-3">
      <Logo />
      <Row className="flex-nowrap">
        <Col
          xs={1}
          className="px-3 px-md-0 d-flex align-items-center justify-content-center"
        >
          <SideMenuToggle />
        </Col>
        <Col className="d-flex justify-content-end">
          <SearchBar />
          <UserButton />
        </Col>
      </Row>
    </StyledContainer>
  );
}

export default TopNav;

const StyledContainer = styled(Container)`
  height: 70px;
`;
