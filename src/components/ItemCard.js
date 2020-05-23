import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

// TODO: Replace this with real data!!!
const variants = [
  {
    name: "natural",
    img: "https://acnhcdn.com/latest/FtrIcon/RoomTexWallEgypt00.png",
  },
  {
    name: "wooden",
    img: "https://acnhcdn.com/latest/FtrIcon/FtrCardboard_Remake_3_0.png",
  },
  {
    name: "natural",
    img: "https://acnhcdn.com/latest/FtrIcon/FtrCardboard_Remake_4_0.png",
  },
  {
    name: "wooden",
    img: "https://acnhcdn.com/latest/FtrIcon/RoomTexWallEgypt00.png",
  },
  {
    name: "natural",
    img: "https://acnhcdn.com/latest/FtrIcon/RoomTexWallEgypt00.png",
  },
  {
    name: "wooden",
    img: "https://acnhcdn.com/latest/FtrIcon/RoomTexWallEgypt00.png",
  },
  {
    name: "natural",
    img: "https://acnhcdn.com/latest/FtrIcon/RoomTexWallEgypt00.png",
  },
  {
    name: "wooden",
    img: "https://acnhcdn.com/latest/FtrIcon/RoomTexWallEgypt00.png",
  },
];

export default function ItemCard() {
  const variationsArea = useRef();
  const variationsAreaLeftArrow = useRef();
  const variationsAreaRightArrow = useRef();

  const [variationAreaTransform, setVariationAreaTransform] = useState(0);
  const [selectedVariationIndex, setSelectedVariationIndex] = useState(0);

  const nextVariation = () => {
    if (selectedVariationIndex < variants.length - 1)
      setSelectedVariationIndex(selectedVariationIndex + 1);
  };

  const prevVariation = () => {
    if (selectedVariationIndex > 0)
      setSelectedVariationIndex(selectedVariationIndex - 1);
  };

  const slideVariationsLeft = () => {
    if (variationAreaTransform < 0)
      setVariationAreaTransform(variationAreaTransform + 32);
  };

  const slideVariationsRight = () => {
    const visibleWidth = variationsArea.current.offsetWidth;
    const fullWidth = variationsArea.current.scrollWidth;

    if (visibleWidth - variationAreaTransform < fullWidth)
      setVariationAreaTransform(variationAreaTransform - 32);
  };

  // Run once to determine if we should show variant scroll arrows.
  useEffect(() => {
    const visibleWidth = variationsArea.current.offsetWidth;
    const fullWidth = variationsArea.current.scrollWidth;

    if (visibleWidth === fullWidth) {
      variationsAreaLeftArrow.current.hidden = true;
      variationsAreaRightArrow.current.hidden = true;
    } else variationsAreaRightArrow.current.classList.add("enabled");
  }, []);

  // Handle variant list scroll changes.
  useEffect(() => {
    variationsArea.current.style.transform =
      "translateX(" + variationAreaTransform + "px)";
    if (variationAreaTransform < 0)
      variationsAreaLeftArrow.current.classList.add("enabled");
    else variationsAreaLeftArrow.current.classList.remove("enabled");

    const visibleWidth = variationsArea.current.offsetWidth;
    const fullWidth = variationsArea.current.scrollWidth;

    if (visibleWidth - variationAreaTransform < fullWidth)
      variationsAreaRightArrow.current.classList.add("enabled");
    else variationsAreaRightArrow.current.classList.remove("enabled");
  }, [variationAreaTransform]);

  // Handle selected variant being changed.
  useEffect(() => {
    const variations = Array.from(variationsArea.current.children);
    const selectedVariation = variations[selectedVariationIndex];

    // Put selected class only on selected variant
    variations.forEach((variation) => variation.classList.remove("selected"));
    selectedVariation.classList.add("selected");

    // Scroll variant list if selected variant is out of view
    const visibleAreaStart = 0 - variationAreaTransform;
    const visbileAreaEnd =
      variationsArea.current.offsetWidth + variationAreaTransform;
    const selectedVariationEnd =
      (selectedVariationIndex + 1) * selectedVariation.offsetWidth;
    if (selectedVariationEnd < visibleAreaStart) slideVariationsLeft();
    if (selectedVariationEnd > visbileAreaEnd) slideVariationsRight();
  }, [selectedVariationIndex]);

  return (
    <OuterBox>
      <TagBox></TagBox>
      <PictureBox>
        <i className="fas fa-arrow-circle-left" onClick={prevVariation}></i>
        <img src={variants[selectedVariationIndex].img} />
        <i className="fas fa-arrow-circle-right" onClick={nextVariation}></i>
      </PictureBox>
      <NameBox>
        <h6>Abstract wall</h6>
        <span>({variants[selectedVariationIndex].name})</span>
      </NameBox>
      <VariantBox>
        <i
          ref={variationsAreaLeftArrow}
          className="fas fa-chevron-left"
          onClick={slideVariationsLeft}
        ></i>
        <div>
          <div ref={variationsArea}>
            {variants.map((variant, index) => (
              <img
                key={index}
                src={variant.img}
                onClick={() => setSelectedVariationIndex(index)}
              />
            ))}
          </div>
        </div>
        <i
          ref={variationsAreaRightArrow}
          className="fas fa-chevron-right"
          onClick={slideVariationsRight}
        ></i>
      </VariantBox>
      <WantHaveBox>
        <div>Want</div>
        <div>Have</div>
      </WantHaveBox>
    </OuterBox>
  );
}

const OuterBox = styled.div`
  border: 1px solid black;
  border-radius: 4px;
  width: 270px;
  height: 320px;
  font-family: "Roboto", sans-serif;
`;

const TagBox = styled.div`
  background: grey;
  height: 25px;
`;

const PictureBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  img {
    width: 150px;
    cursor: pointer;
  }

  i {
    font-size: 40px;
    opacity: 0.2;
    transition: opacity 0.3s;
    cursor: pointer;
  }

  i:hover {
    opacity: 0.8;
  }
`;

const VariantBox = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;

  & > div {
    max-width: 224px;
    overflow: hidden;
  }

  & > div > div {
    display: flex;
    transition: transform 0.2s;
  }

  img {
    width: 30px;
    flex-shrink: 0;
    border: 2px solid grey;
    border-radius: 4px;
    margin: 1px;
    cursor: pointer;
  }

  img:hover:not(.selected) {
    background: rgba(0, 0, 0, 0.2);
    transition: background-color 0.2s;
  }

  .selected {
    background: rgba(0, 0, 0, 0.4);
  }

  i {
    color: grey;
  }

  i.enabled {
    color: black;
    cursor: pointer;
  }

  i.enabled:hover {
    font-size: 20px;
  }
`;

const NameBox = styled.div`
  height: 60px;
  text-align: center;

  h6 {
    margin-bottom: 0;
    font-size: 20px;
    font-weight: 600;
  }
`;

const WantHaveBox = styled.div`
  display: flex;
  padding: 0 5px;

  div {
    text-align: center;
    cursor: pointer;
    user-select: none;
    background: grey;
    border: none;
    border-radius: 4px;
    margin: 1px;
    width: 100%;
  }

  div:hover {
    background: rgba(0, 0, 0, 0.4);
    transition: background-color 0.2s;
  }
`;
