import React, { useEffect } from "react";
import "./App.css";
import { Container, Collapse } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import TopNav from "./components/TopNav";
import SideNav from "./components/SideNav";
import styled from "styled-components";
import SideMenuToggle from "./components/SideMenuToggle";
import { useSelector, useDispatch } from "react-redux";
import { setSideNavOpen } from "./redux/actions";

export default function App() {
  const dispatch = useDispatch();
  const sideNavOpen = useSelector((state) => state.sideNavOpen);

  useEffect(() => {
    let lastWindowSize = window.innerWidth;

    const handleResize = () => {
      // Hide the side nav if we cross over boundary to small screen size,
      // but don't hide it if we're just resizing within small screen size range.
      if (window.innerWidth <= 768 && lastWindowSize > 768)
        dispatch(setSideNavOpen(false));
      lastWindowSize = window.innerWidth;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <React.Fragment>
      <Container fluid className="fixed-top bg-dark py-3">
        <CollapseStyle in={sideNavOpen}>
          <Row className="collapse show no-gutters d-flex h-100 position-relative">
            <CollapseStyle in={sideNavOpen}>
              <Col
                xs={3}
                className="px-0 w-sidebar navbar-collapse collapse d-none d-md-flex"
              ></Col>
            </CollapseStyle>
            <Col className="px-2 px-md-0">
              <SideMenuToggle />
            </Col>
          </Row>
        </CollapseStyle>
      </Container>
      <Container fluid className="px-0 h-100">
        <CollapseStyle in={sideNavOpen}>
          <Row className="vh-100 collapse show no-gutters d-flex h-100 position-relative">
            <CollapseStyle in={sideNavOpen}>
              <Col
                xs={3}
                className="p-0 vh-100 h-100 w-sidebar navbar-collapse collapse d-none d-md-flex sidebar"
              >
                <SideNav />
              </Col>
            </CollapseStyle>
            <Col className="p-3">
              <h3>Content..</h3>
              <p className="lead">
                Try this is full-page view to see the animation on larger
                screens!
              </p>
              <p>
                Sriracha biodiesel taxidermy organic post-ironic, Intelligentsia
                salvia mustache 90's code editing brunch. Butcher polaroid VHS
                art party, hashtag Brooklyn deep v PBR narwhal sustainable
                mixtape swag wolf squid tote bag. Tote bag cronut semiotics, raw
                denim deep v taxidermy messenger bag. Tofu YOLO Etsy, direct
                trade ethical Odd Future jean shorts paleo. Forage Shoreditch
                tousled aesthetic irony, street art organic Bushwick artisan
                cliche semiotics ugh synth chillwave meditation. Shabby chic
                lomo plaid vinyl chambray Vice. Vice sustainable cardigan,
                Williamsburg master cleanse hella DIY 90's blog. Ethical
                Kickstarter PBR asymmetrical lo-fi. Dreamcatcher street art
                Carles, stumptown gluten-free Kickstarter artisan Wes Anderson
                wolf pug. Godard sustainable you probably haven't heard of them,
                vegan farm-to-table!
              </p>
            </Col>
          </Row>
        </CollapseStyle>
      </Container>
    </React.Fragment>
  );
}

const CollapseStyle = styled(Collapse)`
  @media (max-width: 768px) {
    .row.collapse,
    .row.collapsing {
      margin-left: 0 !important;
      left: 0 !important;
      overflow: visible;
    }

    .sidebar.collapse {
      display: flex !important;
      margin-left: -100% !important;
      transition: all 0.3s linear;
      position: fixed;
      z-index: 1050;
      max-width: 0;
      min-width: 0;
      flex-basis: auto;
    }

    .sidebar.collapse.show {
      margin-left: 0 !important;
      width: 100%;
      max-width: 100%;
      min-width: initial;
    }

    .sidebar.collapsing {
      display: flex !important;
      margin-left: -10% !important;
      transition: all 0.2s linear !important;
      position: fixed;
      z-index: 1050;
      min-width: initial;
    }
  }
`;
