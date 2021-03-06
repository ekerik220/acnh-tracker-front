import React from "react";
import styled, { css } from "styled-components";
import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setPopupData } from "redux/slices";
import capitalize from "utils/capitalize";
export default function ListItem({ item, wishlistVariations }) {
  const allData = useSelector((state) => state.allData.list);
  const dispatch = useDispatch();

  const showItemPopup = () => {
    const itemData = getItemData(item.item_name);
    dispatch(setPopupData(itemData));
  };

  const getItemData = (itemName) => {
    return allData.find((item) => item.name === itemName);
  };

  const isAWishlistVariation = (variation) => {
    if (!wishlistVariations) return false;
    return wishlistVariations.includes(variation);
  };

  return (
    <Wrapper onClick={showItemPopup}>
      <span>{capitalize(item.item_name)}</span>
      <div className="variations-badge">
        {item.variations.length > 0 && (
          <OverlayTrigger
            overlay={
              <Tooltip>
                <ToolTipList>
                  {item.variations.map((v) => (
                    <ToolTipListItem
                      totalBoxes={item.variations.length}
                      key={v}
                    >
                      <span>{v}</span>
                      {isAWishlistVariation(v) && (
                        <i className="fas fa-star"></i>
                      )}
                    </ToolTipListItem>
                  ))}
                </ToolTipList>
              </Tooltip>
            }
          >
            <StyledBadge variant="dark">{item.variations.length}</StyledBadge>
          </OverlayTrigger>
        )}
      </div>
      {wishlistVariations && (
        <OverlayTrigger
          overlay={
            <Tooltip>
              <span>Wishlist item</span>
            </Tooltip>
          }
        >
          <i className="fas fa-star"></i>
        </OverlayTrigger>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr 1fr;
  border-bottom: 1px solid black;
  cursor: pointer;
  transition: background-color 0.1s;
  padding: 3px;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  i {
    color: #0074d9;
    align-self: center;
    justify-self: flex-end;
    margin-right: 10px;
  }
`;

const ToolTipList = styled.div`
  display: grid;
  text-align: left;
  grid-template-columns: auto auto min-content;

  span {
    padding: 3px;
  }
`;

const StyledBadge = styled(Badge)`
  font-size: 14px;
`;

const ToolTipListItem = styled.div`
  display: flex;

  i {
    color: #0074d9;
    align-self: center;
  }

  ${(props) =>
    props.totalBoxes === 2
      ? css`
          &:nth-child(1) {
            border-right: 1px solid white;
            padding-right: 5px;
            margin-right: 5px;
          }
        `
      : props.totalBoxes > 2
      ? css`
          &:not(:nth-child(3n)) {
            border-right: 1px solid white;
            padding-right: 5px;
            margin-right: 5px;
          }
        `
      : null}
`;
