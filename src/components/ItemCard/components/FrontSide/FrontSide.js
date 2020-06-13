import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { HaveButton, WantButton } from "../";
import capitalize from "utils/capitalize";

function FrontSide({ itemData, owned, wanted, setOwned, setWanted }) {
  const variationsArea = useRef();
  const variationLeftArrow = useRef();
  const variationRightArrow = useRef();
  const variationsAreaLeftArrow = useRef();
  const variationsAreaRightArrow = useRef();

  const [variationAreaTransform, setVariationAreaTransform] = useState(0);
  const [selectedVariationIndex, setSelectedVariationIndex] = useState(0);
  const [usingVariationSlider, setUsingVariationSlider] = useState(false);
  const [ownedWantedVariations, setOwnedWantedVariations] = useState({});

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

  const variationOwned = (variation) => {
    return isInList(userList, itemData.name, variation);
  };

  const variationWishlisted = (variation) => {
    return isInList(userWishlist, itemData.name, variation);
  };

  const createOwnedWantedVariationMapping = (
    itemName,
    ownedList,
    wantedList
  ) => {
    const mapping = {};

    const ownedItem = ownedList.find((item) => item.item_name === itemName);
    if (ownedItem)
      ownedItem.variations.forEach((variant) => (mapping[variant] = "owned"));

    const wantedItem = wantedList.find((item) => item.item_name === itemName);
    if (wantedItem)
      wantedItem.variations.forEach((variant) => (mapping[variant] = "wanted"));

    return mapping;
  };

  const handleVariationSliderLeft = () => {
    setUsingVariationSlider(true);
    slideVariationsLeft();
  };

  const handleVariationSliderRight = () => {
    setUsingVariationSlider(true);
    slideVariationsRight();
  };

  const nextVariation = () => {
    setUsingVariationSlider(false);
    if (selectedVariationIndex < variants.length - 1)
      setSelectedVariationIndex(selectedVariationIndex + 1);
  };

  const prevVariation = () => {
    setUsingVariationSlider(false);
    if (selectedVariationIndex > 0)
      setSelectedVariationIndex(selectedVariationIndex - 1);
  };

  const slideVariationsLeft = useCallback(() => {
    if (variationAreaTransform < 0)
      setVariationAreaTransform(variationAreaTransform + 32);
  }, [variationAreaTransform]);

  const slideVariationsRight = useCallback(() => {
    const visibleWidth = variationsArea.current.offsetWidth;
    const fullWidth = variationsArea.current.scrollWidth;

    if (visibleWidth - variationAreaTransform < fullWidth)
      setVariationAreaTransform(variationAreaTransform - 32);
  }, [variationAreaTransform]);

  // Change owned/wanted status of this item whenever user list/wishlist updates
  useEffect(() => {
    isInList(userList, itemData.name, variants[selectedVariationIndex].name)
      ? setOwned(true)
      : setOwned(false);

    isInList(userWishlist, itemData.name, variants[selectedVariationIndex].name)
      ? setWanted(true)
      : setWanted(false);

    const mapping = createOwnedWantedVariationMapping(
      itemData.name,
      userList,
      userWishlist
    );

    setOwnedWantedVariations(mapping);
  }, [
    userList,
    userWishlist,
    selectedVariationIndex,
    itemData.name,
    variants,
    setOwned,
    setWanted,
  ]);

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
    if (!usingVariationSlider) {
      const visibleAreaStart = 0 - variationAreaTransform;
      const visbileAreaEnd =
        variationsArea.current.offsetWidth + variationAreaTransform;
      const selectedVariationEnd =
        (selectedVariationIndex + 1) * selectedVariation.offsetWidth;
      if (selectedVariationEnd < visibleAreaStart) slideVariationsLeft();
      if (selectedVariationEnd > visbileAreaEnd) slideVariationsRight();
    }

    // Update enabled state of big select arrows
    if (selectedVariationIndex === 0)
      variationLeftArrow.current.classList.remove("enabled");
    else variationLeftArrow.current.classList.add("enabled");
    if (selectedVariationIndex < variants.length - 1)
      variationRightArrow.current.classList.add("enabled");
    else variationRightArrow.current.classList.remove("enabled");
  }, [
    selectedVariationIndex,
    slideVariationsLeft,
    slideVariationsRight,
    usingVariationSlider,
    variants.length,
    variationAreaTransform,
  ]);

  return (
    <React.Fragment>
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
        <h6>{capitalize(itemData.name)}</h6>
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
          onClick={handleVariationSliderLeft}
          hidden={variants.length > 7 ? false : true}
        ></i>
        <div>
          <div ref={variationsArea}>
            {variants.length > 1
              ? variants.map((variant, index) => (
                  <VariantImage
                    key={index}
                    border={
                      ownedWantedVariations[variant.name] === "owned"
                        ? "3px solid #2ecc40"
                        : ownedWantedVariations[variant.name] === "wanted"
                        ? "3px solid #0074d9"
                        : "1px solid grey"
                    }
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
          onClick={handleVariationSliderRight}
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
    </React.Fragment>
  );
}

export default FrontSide;

const PictureBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  img {
    width: 150px;
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

const VariantImage = styled.img`
  width: 30px;
  flex-shrink: 0;
  border: ${(props) => props.border || "2px solid grey"};
  border-radius: 4px;
  margin: 1px;
  cursor: pointer;

  &:hover:not(.selected) {
    background: rgba(0, 0, 0, 0.2);
    transition: background-color 0.2s;
  }

  &.selected {
    background: rgba(0, 0, 0, 0.4);
  }
`;
