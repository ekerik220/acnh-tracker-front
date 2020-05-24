import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { Accordion, Card } from "react-bootstrap";
import {
  setSideNavOpen,
  setItemData,
  setSelectedItemType,
  setLoading,
} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

const SideNav = (props) => {
  const dispatch = useDispatch();
  const sideNavRef = useRef();
  const linkList = useRef();
  const [activeCategory, setActiveCategory] = useState();
  const selectedItemType = useSelector((state) => state.selectedItemType);

  const data = [
    {
      category: "Furniture",
      types: [
        { type: "Housewares", dataType: "housewares" },
        { type: "Misc.", dataType: "misc" },
        { type: "Wall-mounted", dataType: "wallmounted" },
      ],
    },
    {
      category: "Clothing",
      types: [
        { type: "Tops", dataType: "tops" },
        { type: "Bottoms", dataType: "bottoms" },
        { type: "Dress-up", dataType: "dressup" },
        { type: "Headwear", dataType: "headwear" },
        { type: "Accessories", dataType: "accessories" },
        { type: "Socks", dataType: "socks" },
        { type: "Shoes", dataType: "shoes" },
        { type: "Bags", dataType: "bags" },
        { type: "Umbrellas", dataType: "umbrellas" },
      ],
    },
    {
      category: "Other",
      types: [
        { type: "Wallpaper", dataType: "wallpaper" },
        { type: "Flooring", dataType: "flooring" },
        { type: "Rugs", dataType: "rugs" },
        { type: "Fossils", dataType: "fossils" },
        { type: "Music", dataType: "music" },
      ],
    },
  ];

  const handleCategoryClick = (index) => {
    // If the clicked category was already the active category, we're now
    // closing it and no categories should be active, so set to -1.
    if (activeCategory === index) setActiveCategory(-1);
    else setActiveCategory(index);
  };

  const handleSelection = (dataType) => {
    props.history.push("/items");
    dispatch(setSideNavOpen(false));
    dispatch(setSelectedItemType(dataType));
    dispatch(setItemData([]));
  };

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        dispatch(setLoading(true));
        const endpoint = "http://localhost:4000/data/" + selectedItemType;
        const response = await fetch(endpoint);
        const data = await response.json();
        dispatch(setItemData(data));
      } catch (err) {
        console.log(err);
      }
      dispatch(setLoading(false));
    }

    fetchMyAPI();
  }, [selectedItemType]);

  return (
    <NavContainer className="bg-dark side-nav-container" ref={sideNavRef}>
      <Navigation>
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
                  <i className="fas fa-chevron-down"></i>
                ) : (
                  <i className="fas fa-chevron-right"></i>
                )}
              </Navigation.Toggle>
              <Navigation.Collapse eventKey={index}>
                <NavDropdownArea>
                  <NavLinkList ref={linkList}>
                    {ele.types.map((type) => {
                      return (
                        <li
                          key={type.dataType}
                          onClick={() => handleSelection(type.dataType)}
                          className={
                            type.dataType === selectedItemType ? "selected" : ""
                          }
                        >
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
};

// Styles
const NavContainer = styled.div`
  display: flex;
  background: white;
  z-index: 1;
  box-shadow: 1px 0 3px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  height: 100%;
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
  background: white;
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
  }

  & li:active {
    background-color: rgba(0, 0, 0, 0.3);
    transition: background-color 0.2s;
  }

  & li.selected {
    background-color: rgba(0, 0, 0, 0.3);
    pointer-events: none;
  }
`;

export default withRouter(SideNav);
