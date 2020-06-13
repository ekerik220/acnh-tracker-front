import React, { Children } from "react";
import styled, { css } from "styled-components";
import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setPopupData } from "redux/slices";
import capitalize from "utils/capitalize";

export default function CatalogueItem({ item }) {
  const allData = useSelector((state) => state.allData.list);
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
      <span>{capitalize(item.item_name)}</span>
      <div className="variations-badge">
        {item.variationList.length > 1 && (
          <OverlayTrigger
            overlay={
              <Tooltip>
                <ToolTipList>
                  {item.variationList.map((v) => (
                    <TooltipItemBox totalBoxes={item.variationList.length}>
                      <span
                        key={v}
                        className={ownVariation(v) ? "owned" : null}
                      >
                        {v}
                      </span>
                    </TooltipItemBox>
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
  padding: 3px;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const ToolTipList = styled.div`
  display: grid;
  text-align: left;
  grid-template-columns: auto auto min-content;

  span {
    padding: 3px;
  }

  .owned {
    color: #00ff00;
  }
`;

const TooltipItemBox = styled.div`
  white-space: nowrap;
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
        `
      : null}
`;
