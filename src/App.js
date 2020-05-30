import React, { useEffect } from "react";
import "./App.css";
import { Col, Row, Container, Collapse, Alert } from "react-bootstrap";
import SideNav from "./components/SideNav";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  setSideNavOpen,
  setErrorText,
  setUserList,
  setUserWishlist,
  setUserName,
  setSelectedItemType,
} from "./redux/actions";
import SideMenuToggle from "./components/SideMenuToggle";
import SearchBar from "./components/SearchBar";
import UserButton from "./components/UserButton";
import Logo from "./components/Logo";
import ItemBox from "./components/ItemBox";
import HomeScreen from "./components/HomeScreen";
import { Switch, Route, Link } from "react-router-dom";
import NoResults from "./components/NoResults";
import UserRegister from "./components/UserRegister";
import Login from "./components/Login";
import ConfirmEmail from "./components/ConfirmEmail";
import { withRouter } from "react-router-dom";

const App = ({ history }) => {
  const dispatch = useDispatch();
  const sideNavOpen = useSelector((state) => state.sideNavOpen);
  const errorText = useSelector((state) => state.errorText);
  const loginToken = useSelector((state) => state.loginToken);

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
    if (loginToken) getUserInfo();
    else {
      dispatch(setUserName(null));
      dispatch(setUserList([]));
      dispatch(setUserWishlist([]));
    }
  }, [loginToken]);

  // If we go to a different route we should de-select the current selected item type
  // in the side nav.
  useEffect(() => {
    const currentPath = history.location.pathname;
    if (currentPath !== "/items") dispatch(setSelectedItemType(null));
  });

  const clickedOutsideSideMenu = (action) => {
    if (action.target.id === "side-nav-col") dispatch(setSideNavOpen(false));
  };

  const getUserInfo = async () => {
    const endpoint = "http://localhost:4000/user";
    const options = { headers: { "auth-token": loginToken } };

    try {
      const req = await fetch(endpoint, options);
      const res = await req.json();

      if (res.error) dispatch(setErrorText(res.error));
      else {
        dispatch(setUserName(res.name));
        dispatch(setUserList(res.list));
        dispatch(setUserWishlist(res.wishlist));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <TopArea fluid className="bg-dark py-3">
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
            <ContentArea className="p-3" id="content-area">
              <Alert
                variant="danger"
                onClose={() => dispatch(setErrorText(null))}
                dismissible
                hidden={!errorText}
              >
                <p>{errorText}</p>
              </Alert>
              <Switch>
                <Route exact path="/">
                  <HomeScreen />
                </Route>
                <Route path="/items">
                  <ItemBox />
                </Route>
                <Route path="/noresults">
                  <NoResults />
                </Route>
                <Route path="/register">
                  <UserRegister />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/confirm/:userKey" children={<ConfirmEmail />} />
              </Switch>
            </ContentArea>
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
  opacity: 0.3;
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1;
`;

export default withRouter(App);
