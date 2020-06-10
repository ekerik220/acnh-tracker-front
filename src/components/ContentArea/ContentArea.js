import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { resetAllDataError } from "redux/slices";
import { Switch, Route } from "react-router-dom";
import { Col, Alert } from "react-bootstrap";
import {
  HomeScreen,
  ItemBox,
  UserRegister,
  Login,
  Catalogue,
  ConfirmEmail,
  Compare,
  PasswordReset,
  ForgotPassword,
} from "components";

function ContentArea() {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.allData.error);

  const closeAlert = () => dispatch(resetAllDataError());

  return (
    <StyledContainer className="p-3" id="content-area">
      <Alert variant="danger" onClose={closeAlert} dismissible hidden={!error}>
        <p>{error}</p>
      </Alert>
      <Switch>
        <Route exact path="/">
          <HomeScreen />
        </Route>
        <Route path="/items">
          <ItemBox />
        </Route>
        <Route path="/register">
          <UserRegister />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/confirm/:userKey" children={<ConfirmEmail />} />
        <Route path="/catalogue">
          <Catalogue />
        </Route>
        <Route path="/compare">
          <Compare />
        </Route>
        <Route path="/passwordreset/:token" children={<PasswordReset />} />
        <Route path="/forgotpassword">
          <ForgotPassword />
        </Route>
      </Switch>
    </StyledContainer>
  );
}

const StyledContainer = styled(Col)`
  overflow-y: auto;
  height: 100%;
`;

export default ContentArea;
