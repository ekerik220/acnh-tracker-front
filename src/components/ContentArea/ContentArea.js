import React from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {setErrorText} from 'redux/slices';
import {Switch, Route} from 'react-router-dom';
import {Col, Alert} from 'react-bootstrap';
import {HomeScreen, ItemBox, NoResults, UserRegister, Login, Catalogue, ConfirmEmail} from 'routes';

function ContentArea() {
    const dispatch = useDispatch();

    const errorText = useSelector(state => state.errorText);

    return (
        <StyledContainer className="p-3" id="content-area">
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
                <Route path="/catalogue">
                  <Catalogue />
                </Route>
              </Switch>
            </StyledContainer>
    )
}

const StyledContainer = styled(Col)`
  overflow-y: auto;
  height: 100%;
`;

export default ContentArea;
