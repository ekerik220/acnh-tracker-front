import React, { useEffect } from "react";
import "./App.css";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  setSideNavOpen,
  setSelectedItemType,
  fetchUser,
  fetchAllData,
  setPopupData,
} from "redux/slices";
import { withRouter } from "react-router-dom";
import { Col, Row, Container, Collapse } from "react-bootstrap";
import { TopNav, SideNav, ContentArea } from "components";

const App = ({ history }) => {
  const dispatch = useDispatch();
  const sideNavOpen = useSelector((state) => state.sideNavOpen);
  const loginToken = useSelector((state) => state.loginToken.token);
  const popupData = useSelector((state) => state.popupData);

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

  useEffect(() => {
    dispatch(fetchUser(loginToken));
  }, [loginToken, dispatch]);

  // If we go to a different route we should de-select the current selected item type
  // in the side nav.
  useEffect(() => {
    const currentPath = history.location.pathname;
    if (currentPath !== "/items") dispatch(setSelectedItemType(null));
  });

  // Grab item data from server
  useEffect(() => {
    dispatch(fetchAllData());
  }, [dispatch]);

  const clickedOutsideSideMenu = (action) => {
    if (action.target.id === "side-nav-col") dispatch(setSideNavOpen(false));
  };

  const hideBackgroundBlackout = () => {
    dispatch(setPopupData(null));
  };

  return (
    <React.Fragment>
      {popupData && <BackgroundBlackout onClick={hideBackgroundBlackout} />}
      <TopNav />
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
            <ContentArea />
          </Row>
        </CollapseStyle>
      </BottomArea>
    </React.Fragment>
  );
};

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

const BottomArea = styled(Container)`
  padding-left: 0;
  padding-right: 0;
  height: calc(100% - 70px);
  position: relative;
`;

const FadedOverlay = styled.div`
  background-color: black;
  opacity: 0.3;
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1;
`;

const BackgroundBlackout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: black;
  opacity: 0.3;
  z-index: 3;
`;

export default withRouter(App);
