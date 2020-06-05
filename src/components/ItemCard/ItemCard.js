import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPopupData } from "redux/slices";
import styled from "styled-components";
import { HaveButton, WantButton } from "./components";

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export default function ItemCard({ itemData, closeButton = false }) {
  const dispatch = useDispatch();
  const variationsArea = useRef();
  const variationLeftArrow = useRef();
  const variationRightArrow = useRef();
  const variationsAreaLeftArrow = useRef();
  const variationsAreaRightArrow = useRef();

  const [variationAreaTransform, setVariationAreaTransform] = useState(0);
  const [selectedVariationIndex, setSelectedVariationIndex] = useState(0);
  const [wanted, setWanted] = useState(false);
  const [owned, setOwned] = useState(false);

  const userList = useSelector((state) => state.user.list);
  const userWishlist = useSelector((state) => state.user.wishlist);

  const variants = itemData.variations;
  const img_url_prefix = "https://acnhcdn.com/latest/FtrIcon/";

  const isInList = (list, itemName, variation) => {
    if (variation !== "NA")
      return list.some(
        (item) =>
          item.item_name === itemName && item.variations.includes(variation)
      );
    else return list.some((item) => item.item_name === itemName);
  };

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

  // Change owned/wanted status of this item whenever user list/wishlist updates
  useEffect(() => {
    isInList(userList, itemData.name, variants[selectedVariationIndex].name)
      ? setOwned(true)
      : setOwned(false);

    isInList(userWishlist, itemData.name, variants[selectedVariationIndex].name)
      ? setWanted(true)
      : setWanted(false);
  }, [userList, userWishlist, selectedVariationIndex]);

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

    if (!selectedVariation) return;

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

    // Update enabled state of big select arrows
    if (selectedVariationIndex === 0)
      variationLeftArrow.current.classList.remove("enabled");
    else variationLeftArrow.current.classList.add("enabled");
    if (selectedVariationIndex < variants.length - 1)
      variationRightArrow.current.classList.add("enabled");
    else variationRightArrow.current.classList.remove("enabled");
  }, [selectedVariationIndex]);

  return (
    <OuterBox>
      <TagBox className={owned ? "owned" : wanted ? "wanted" : null}>
        <i
          class="far fa-times-circle"
          onClick={() => dispatch(setPopupData(null))}
          hidden={!closeButton}
        ></i>
      </TagBox>
      <PictureBox>
        <i
          className="fas fa-arrow-circle-left"
          onClick={prevVariation}
          ref={variationLeftArrow}
          hidden={variants.length > 1 ? false : true}
        ></i>
        <img
          src={img_url_prefix + variants[selectedVariationIndex].img + ".png"}
          alt=""
        />
        <i
          className="fas fa-arrow-circle-right"
          onClick={nextVariation}
          ref={variationRightArrow}
          hidden={variants.length > 1 ? false : true}
        ></i>
      </PictureBox>
      <NameBox>
        <h6>{itemData.name.capitalize()}</h6>
        <span>
          {variants.length > 1
            ? "(" + variants[selectedVariationIndex].name + ")"
            : null}
        </span>
      </NameBox>
      <VariantBox>
        <i
          ref={variationsAreaLeftArrow}
          className="fas fa-chevron-left"
          onClick={slideVariationsLeft}
          hidden={variants.length > 7 ? false : true}
        ></i>
        <div>
          <div ref={variationsArea}>
            {variants.length > 1
              ? variants.map((variant, index) => (
                  <img
                    key={index}
                    src={img_url_prefix + variant.img + ".png"}
                    onClick={() => setSelectedVariationIndex(index)}
                    alt=""
                  />
                ))
              : null}
          </div>
        </div>
        <i
          ref={variationsAreaRightArrow}
          className="fas fa-chevron-right"
          onClick={slideVariationsRight}
          hidden={variants.length > 7 ? false : true}
        ></i>
      </VariantBox>
      <WantHaveBox>
        <WantButton
          itemName={itemData.name}
          itemCategory={itemData["item-type"]}
          itemVariation={variants[selectedVariationIndex].name}
          variationList={variants.map((v) => v.name)}
          selected={wanted}
        />
        <HaveButton
          itemName={itemData.name}
          itemCategory={itemData["item-type"]}
          itemVariation={variants[selectedVariationIndex].name}
          variationList={variants.map((v) => v.name)}
          selected={owned}
        />
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
  transition: background-color 0.5s;
  display: grid;
  align-items: center;

  i {
    justify-self: end;
    cursor: pointer;
    color: white;
    margin-right: 3px;
  }

  i:hover {
    color: black;
  }

  &.owned {
    background: #2ecc40;
  }

  &.wanted {
    background: #0074d9;
  }
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
    color: grey;
    transition: font-size 0.2s;
  }

  i.enabled {
    color: black;
    cursor: pointer;
  }

  i.enabled:hover {
    font-size: 45px;
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
    transition: font-size 0.2s;
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
`;
