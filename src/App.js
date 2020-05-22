import React, { useEffect } from "react";
import "./App.css";
import { Container, Collapse } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import TopNav from "./components/TopNav";
import SideNav from "./components/SideNav";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setSideNavOpen } from "./redux/actions";
import SideMenuToggle from "./components/SideMenuToggle";
import SearchBar from "./components/SearchBar";

export default function App() {
  const dispatch = useDispatch();
  const sideNavOpen = useSelector((state) => state.sideNavOpen);

  useEffect(() => {
    if (window.innerWidth <= 768) dispatch(setSideNavOpen(false));
  }, []);

  useEffect(() => {
    let lastWindowSize = window.innerWidth;

    const handleResize = () => {
      // Hide the side nav and search bar if we cross over boundary to small screen size,
      // but don't hide it if we're just resizing within small screen size range.
      if (lastWindowSize > 768) dispatch(setSideNavOpen(false));

      lastWindowSize = window.innerWidth;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const clickedOutsideSideMenu = (action) => {
    if (action.target.id === "side-nav-col") dispatch(setSideNavOpen(false));
  };

  return (
    <React.Fragment>
      <TopArea fluid className="bg-dark py-3">
        <Row>
          <Col xs={1} className="px-3 px-md-0 d-flex align-items-center">
            <SideMenuToggle />
          </Col>
          <Col className="d-flex justify-content-end">
            <SearchBar />
          </Col>
          <Col xs={1} className="px-3 px-md-0 d-flex align-items-center"></Col>
        </Row>
      </TopArea>
      <BottomArea fluid onClick={clickedOutsideSideMenu}>
        {sideNavOpen && <FadedOverlay />}
        <CollapseStyle in={sideNavOpen}>
          <Row className="collapse show no-gutters d-flex h-100 position-relative">
            <CollapseStyle in={sideNavOpen}>
              <Col
                xs={3}
                className="p-0 h-100 w-sidebar navbar-collapse d-none d-md-flex align-items-center sidebar"
                id="side-nav-col"
              >
                <SideNav />
              </Col>
            </CollapseStyle>
            <ContentArea className="p-3">
              <div className="test">
                <h3>Content..</h3>
                <p className="lead">
                  Try this is full-page view to see the animation on larger
                  screens!
                </p>
                <p>
                  Sriracha biodiesel taxidermy organic post-ironic,
                  Intelligentsia salvia mustache 90's code editing brunch.
                  Butcher polaroid VHS art party, hashtag Brooklyn deep v PBR
                  narwhal sustainable mixtape swag wolf squid tote bag. Tote bag
                  cronut semiotics, raw denim deep v taxidermy messenger bag.
                  Tofu YOLO Etsy, direct trade ethical Odd Future jean shorts
                  paleo. Forage Shoreditch tousled aesthetic irony, street art
                  organic Bushwick artisan cliche semiotics ugh synth chillwave
                  meditation. Shabby chic lomo plaid vinyl chambray Vice. Vice
                  sustainable cardigan, Williamsburg master cleanse hella DIY
                  90's blog. Ethical Kickstarter PBR asymmetrical lo-fi.
                  Dreamcatcher street art Carles, stumptown gluten-free
                  Kickstarter artisan Wes Anderson wolf pug. Godard sustainable
                  you probably haven't heard of them, vegan farm-to-table!
                </p>
              </div>
            </ContentArea>
          </Row>
        </CollapseStyle>
      </BottomArea>
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
      height: 292px;
    }

    .sidebar.collapse.show {
      margin-left: 0 !important;
      width: 100%;
      max-width: 100%;
      min-width: initial;
      height: 292px;
    }

    .sidebar.collapsing {
      display: flex !important;
      margin-left: -10% !important;
      transition: all 0.2s linear !important;
      position: fixed;
      z-index: 1050;
      min-width: initial;
    }

    .side-nav-container {
      height: calc(100% - 70px);
      transform: translate(0, -35px);
    }
  }
`;

const TopArea = styled(Container)`
  height: 70px;
`;

const BottomArea = styled(Container)`
  padding-left: 0;
  padding-right: 0;
  height: calc(100% - 70px);
  position: relative;
`;

const ContentArea = styled(Col)`
  overflow-y: auto;
  height: 100%;
`;

const FadedOverlay = styled.div`
  background-color: black;
  opacity: 0.2;
  position: absolute;
  height: 100%;
  width: 100%;
`;
