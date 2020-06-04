import React from "react";
import styled from "styled-components";
import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setPopupData } from "../../../redux/actions";

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export default function CatalogueItem({ item }) {
  const allData = useSelector((state) => state.allData);
  const dispatch = useDispatch();

  const ownVariation = (variation) => {
    return item.variations.some((v) => v === variation);
  };

  const showItemPopup = () => {
    const itemData = getItemData(item.item_name);
    dispatch(setPopupData(itemData));
  };

  const getItemData = (itemName) => {
    return allData.find((item) => item.name === itemName);
  };

  return (
    <Wrapper onClick={showItemPopup}>
      <span>{item.item_name.capitalize()}</span>
      <div className="variations-badge">
        {item.variationList.length > 1 && (
          <OverlayTrigger
            overlay={
              <Tooltip>
                <ToolTipList>
                  {item.variationList.map((v) => (
                    <span key={v} className={ownVariation(v) ? "owned" : null}>
                      {v}
                    </span>
                  ))}
                </ToolTipList>
              </Tooltip>
            }
          >
            <Badge variant="dark">
              {item.variations.length} / {item.variationList.length}
            </Badge>
          </OverlayTrigger>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
  border-bottom: 1px solid black;
  cursor: pointer;
  transition: background-color 0.1s;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const ToolTipList = styled.div`
  display: grid;
  text-align: left;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;

  .owned {
    color: #00ff00;
  }
`;
