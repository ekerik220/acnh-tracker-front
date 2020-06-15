import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { InputGroup, Form, FormControl, Button } from "react-bootstrap";
import { ListItem } from "./components";
import { ItemCard } from "components/ItemCard";
import { searchUser } from "api/backend";

export default function Compare() {
  const [searchField, setSearchField] = useState("");
  const [fetchedUser, setFetchedUser] = useState([]);
  const [error, setError] = useState(null);
  const [itemsYouNeed, setItemsYouNeed] = useState([]);
  const [itemsTheyNeed, setItemsTheyNeed] = useState([]);
  const [
    itemsTheyNeedWishlistFilter,
    setItemsTheyNeedWishlistFilter,
  ] = useState(false);
  const [itemsYouNeedWishlistFilter, setItemsYouNeedWishlistFilter] = useState(
    false
  );

  const mainUser = useSelector((state) => state.user);
  const popupData = useSelector((state) => state.popupData);

  const searchFieldOnChange = (event) => setSearchField(event.target.value);

  const fetchUser = () => {
    if (searchField.length < 2) return;
    setError(null);
    setItemsYouNeed([]);
    setItemsTheyNeed([]);
    searchUser(searchField).then((res) => {
      if (res.error) setError(res.error);
      else setFetchedUser(res);
    });
  };

  useEffect(() => {
    if (!mainUser.list || !fetchedUser.list) return;
    const youNeed = compareUserLists(mainUser.list, fetchedUser.list);
    const theyNeed = compareUserLists(fetchedUser.list, mainUser.list);

    if (itemsYouNeedWishlistFilter) {
      let wishlistedItems = [];
      youNeed.forEach((item) => {
        const wishlistedVariations = getWishlistedVariations(
          item,
          mainUser.wishlist
        );
        if (wishlistedVariations)
          wishlistedItems.push({ ...item, variations: wishlistedVariations });
      });
      setItemsYouNeed(wishlistedItems);
    } else setItemsYouNeed(youNeed);

    if (itemsTheyNeedWishlistFilter) {
      let wishlistedItems = [];
      theyNeed.forEach((item) => {
        const wishlistedVariations = getWishlistedVariations(
          item,
          fetchedUser.wishList
        );
        if (wishlistedVariations)
          wishlistedItems.push({ ...item, variations: wishlistedVariations });
      });
      setItemsTheyNeed(wishlistedItems);
    } else setItemsTheyNeed(theyNeed);
  }, [
    mainUser,
    fetchedUser,
    itemsYouNeedWishlistFilter,
    itemsTheyNeedWishlistFilter,
  ]);

  // Compares main and secondary lists and returns the items that main
  // needs from secondary.
  const compareUserLists = (main, secondary) => {
    let itemsMainNeeds = [];
    secondary.forEach((secondaryItem) => {
      const itemMatch = main.find(
        (mainItem) => mainItem.item_name === secondaryItem.item_name
      );
      // If the item_name matches then we need to compare variants...
      if (itemMatch) {
        let neededVariations = [];
        secondaryItem.variations.forEach((secondaryVariation) => {
          // If the secondary variation is in main item (itemMatch) variation list
          // then we DON'T need it. If it's not in the list, we DO need it, so add
          // it to neededVariations.
          const variationMatch = itemMatch.variations.includes(
            secondaryVariation
          );
          if (!variationMatch) neededVariations.push(secondaryVariation);
        });
        // If we did find any variations that we need...
        if (neededVariations.length > 0) {
          const newItem = { ...itemMatch, variations: neededVariations };
          itemsMainNeeds.push(newItem);
        }
      }
      // Else, if the item_name does not match, then we need that item and all variations
      else itemsMainNeeds.push(secondaryItem);
    });
    return itemsMainNeeds;
  };

  const getWishlistedVariations = (item, wishlist) => {
    if (!wishlist) return null;
    const itemName = item.item_name;
    const wishlistItem = wishlist.find((item) => item.item_name === itemName);

    if (!wishlistItem) return null;
    const wishlistVariations = wishlistItem.variations;

    return item.variations.filter((variation) =>
      wishlistVariations.includes(variation)
    );
  };

  const handleWishlistOnlyCheckboxChange = (event) => {
    const checkbox = event.target;
    if (checkbox.value === "itemsTheyNeed")
      setItemsTheyNeedWishlistFilter(!itemsTheyNeedWishlistFilter);
    else if (checkbox.value === "itemsYouNeed")
      setItemsYouNeedWishlistFilter(!itemsYouNeedWishlistFilter);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") fetchUser();
  };

  return (
    <Wrapper>
      {popupData && (
        <div className="popup-card">
          <ItemCard itemData={popupData} closeButton={true} />
        </div>
      )}
      <h2>Compare Catalogues</h2>
      <SearchArea>
        <span>{error}</span>
        <InputGroup>
          <FormControl
            placeholder="Search user"
            value={searchField}
            onChange={searchFieldOnChange}
            onKeyPress={handleKeyPress}
          />
          <InputGroup.Append>
            <Button
              style={{ fontSize: 16 }}
              variant="primary"
              onClick={fetchUser}
            >
              <i class="fas fa-search"></i>
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </SearchArea>
      <ListArea>
        <div>
          <ListWrapper>
            <ListTitle>
              <span>Items you need</span>
              <Form.Check
                value="itemsYouNeed"
                type="checkbox"
                label="Wishlist only"
                checked={itemsYouNeedWishlistFilter}
                onChange={handleWishlistOnlyCheckboxChange}
              />
            </ListTitle>
            <List>
              {itemsYouNeed.map((item) => (
                <ListItem
                  key={item.item_name}
                  item={item}
                  wishlistVariations={getWishlistedVariations(
                    item,
                    mainUser.wishlist
                  )}
                />
              ))}
            </List>
          </ListWrapper>
        </div>
        <div>
          <ListWrapper>
            <ListTitle>
              <span>Items they need</span>
              <Form.Check
                value="itemsTheyNeed"
                type="checkbox"
                label="Wishlist only"
                checked={itemsTheyNeedWishlistFilter}
                onChange={handleWishlistOnlyCheckboxChange}
              />
            </ListTitle>
            <List>
              {itemsTheyNeed.map((item) => (
                <ListItem
                  key={item.item_name}
                  item={item}
                  wishlistVariations={getWishlistedVariations(
                    item,
                    fetchedUser.wishList
                  )}
                />
              ))}
            </List>
          </ListWrapper>
        </div>
      </ListArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .popup-card {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: white;
    z-index: 4;
  }
`;

const SearchArea = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  width: 100%;
  position: relative;

  & > div {
    max-width: 300px;
  }

  & > span {
    position: absolute;
    top: -30px;
    color: red;
  }
`;

const ListArea = styled.div`
  display: flex;
  justify-content: space-around;
  height: 100%;
  margin-top: 30px;

  & > div {
    width: 45%;
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
  }

  @media (max-width: 700px) {
    flex-direction: column;

    & > div {
      width: 100%;
    }
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  height: 100%;
  overflow-y: auto;
`;

const ListWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
`;

const ListTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;
