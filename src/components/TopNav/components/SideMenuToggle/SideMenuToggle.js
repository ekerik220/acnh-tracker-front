import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setSideNavOpen } from "redux/actions";

export default function SideMenuToggle() {
  const dispatch = useDispatch();
  const sideNavOpen = useSelector((state) => state.sideNavOpen);

  return (
    <ToggleButton
      onClick={() => dispatch(setSideNavOpen(!sideNavOpen))}
      className="collapse-hamburger"
    >
      <i className="fa fa-bars fa-lg"></i>
    </ToggleButton>
  );
}

const ToggleButton = styled.a`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }

  i {
    color: white;
  }
`;
