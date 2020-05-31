import React from "react";
import styled from "styled-components";
import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap";

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export default function CatalogueItem({ item }) {
  const ownVariation = (variation) => {
    return item.variations.some((v) => v === variation);
  };

  return (
    <Wrapper>
      <span>{item.item_name.capitalize()}</span>
      <div className="variations-badge">
        {item.variationList.length > 1 && (
          <OverlayTrigger
            overlay={
              <Tooltip>
                <ToolTipList>
                  {item.variationList.map((v) => (
                    <span
                      key={v.name}
                      className={ownVariation(v.name) ? "owned" : null}
                    >
                      {v.name}
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
