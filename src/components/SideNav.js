import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Accordion, Card, Collapse, Col } from "react-bootstrap";
import { setSideNavOpen } from "../redux/actions";
import { useDispatch } from "react-redux";

export default function SideNav() {
  const dispatch = useDispatch();
  const sideNavRef = useRef();
  const [activeCategory, setActiveCategory] = useState();

  const handleCategoryClick = (index) => {
    // If the clicked category was already the active category, we're now
    // closing it and no categories should be active, so set to -1.
    if (activeCategory === index) setActiveCategory(-1);
    else setActiveCategory(index);
  };

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
    <NavContainer className="bg-dark" ref={sideNavRef}>
      <Navigation id="side-nav">
        {data.map((ele, index) => {
          return (
            <Card key={index} className="bg-dark">
              <Navigation.Toggle
                as={Category}
                eventKey={index}
                onClick={() => handleCategoryClick(index)}
              >
                {ele.category}
                {activeCategory === index ? (
                  <i class="fas fa-chevron-down"></i>
                ) : (
                  <i class="fas fa-chevron-right"></i>
                )}
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
            </Card>
          );
        })}
      </Navigation>
    </NavContainer>
  );
}

// Styles
const NavContainer = styled.div`
  height: 100vh;
  display: flex;
  position: fixed;
  background: white;
  z-index: 1;
  box-shadow: 1px 0 3px rgba(0, 0, 0, 0.3);
`;

const Navigation = styled(Accordion)`
  width: 200px;
  user-select: none;
  font-family: "Roboto", sans-serif;
`;

const Category = styled(Card.Header)`
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  font-weight: 600;
`;

const NavDropdownArea = styled(Card.Body)`
  background: rgba(255, 255, 255, 0.9);
  padding: 0;
`;

const NavLinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.05);

  & li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    cursor: pointer;
    padding: 5px 10px;
  }

  & li:hover {
    background-color: rgba(0, 0, 0, 0.07);
    transition: background-color 0.2s;
  }

  & li:active {
    background-color: rgba(0, 0, 0, 0.3);
    transition: background-color 0.2s;
  }
`;
