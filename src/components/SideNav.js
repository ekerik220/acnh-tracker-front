import React from "react";
import styled from "styled-components";
import { Accordion, Card, Collapse, Col } from "react-bootstrap";
import { useState } from "react";
import { setSideNavOpen } from "../redux/actions";
import { useDispatch } from "react-redux";

export default function SideNav() {
  const dispatch = useDispatch();

  const data = [
    {
      category: "Furniture",
      types: [
        { type: "Housewares", link: "url" },
        { type: "Misc.", link: "url" },
        { type: "Wall-mounted", link: "url" },
      ],
    },
    {
      category: "Clothing",
      types: [
        { type: "Tops", link: "url" },
        { type: "Bottoms", link: "url" },
        { type: "Dress-up", link: "url" },
        { type: "Headwear", link: "url" },
        { type: "Accessories", link: "url" },
        { type: "Socks", link: "url" },
        { type: "Shoes", link: "url" },
        { type: "Bags", link: "url" },
        { type: "Umbrellas", link: "url" },
      ],
    },
    {
      category: "Other",
      types: [
        { type: "Wallpaper", link: "url" },
        { type: "Flooring", link: "url" },
        { type: "Rugs", link: "url" },
        { type: "Fossils", link: "url" },
        { type: "Music", link: "url" },
      ],
    },
  ];

  return (
    <NavContainer>
      <Navigation>
        {data.map((ele, index) => {
          return (
            <NavCategory key={index}>
              <Navigation.Toggle as={NavCategory.Header} eventKey={index}>
                {ele.category}
              </Navigation.Toggle>
              <Navigation.Collapse eventKey={index}>
                <NavDropdownArea>
                  <NavLinkList>
                    {ele.types.map((type, index) => {
                      return (
                        <li onClick={() => dispatch(setSideNavOpen(false))}>
                          {type.type}
                        </li>
                      );
                    })}
                  </NavLinkList>
                </NavDropdownArea>
              </Navigation.Collapse>
            </NavCategory>
          );
        })}
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
