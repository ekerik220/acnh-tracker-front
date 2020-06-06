import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CircularProgress from "../../components/CircularProgress/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemTotals } from "redux/slices";
import CatalogueItemArea from "../../components/CatalogueItemArea/CatalogueItemArea";
import ItemCard from "../../components/ItemCard/ItemCard";

export default function Catalogue() {
  const dispatch = useDispatch();
  const itemTotals = useSelector((state) => state.itemTotals);
  const userList = useSelector((state) => state.user.list);
  const popupData = useSelector((state) => state.popupData);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [displayedList, setDisplayedList] = useState(userList);
  const [currentTotal, setCurrentTotal] = useState(1);
  const [currentTotalVariations, setCurrentTotalVariations] = useState(1);

  const categories = [
    {
      name: "All",
      type: "all",
      total: itemTotals.all,
      total_v: itemTotals.all_v,
    },
    {
      name: "Housewares",
      type: "housewares",
      total: itemTotals.housewares,
      total_v: itemTotals.housewares_v,
    },
    {
      name: "Misc.",
      type: "misc",
      total: itemTotals.misc,
      total_v: itemTotals.misc_v,
    },
    {
      name: "Wall-mounted",
      type: "wallmounted",
      total: itemTotals.wallmounted,
      total_v: itemTotals.wallmounted_v,
    },
    {
      name: "Tops",
      type: "tops",
      total: itemTotals.tops,
      total_v: itemTotals.tops_v,
    },
    {
      name: "Bottoms",
      type: "bottoms",
      total: itemTotals.bottoms,
      total_v: itemTotals.bottoms_v,
    },
    {
      name: "Dress-up",
      type: "dressup",
      total: itemTotals.dressup,
      total_v: itemTotals.dressup_v,
    },
    {
      name: "Headwear",
      type: "headwear",
      total: itemTotals.headwear,
      total_v: itemTotals.headwear_v,
    },
    {
      name: "Accessories",
      type: "accessories",
      total: itemTotals.accessories,
      total_v: itemTotals.accessories_v,
    },
    {
      name: "Socks",
      type: "socks",
      total: itemTotals.socks,
      total_v: itemTotals.socks_v,
    },
    {
      name: "Shoes",
      type: "shoes",
      total: itemTotals.shoes,
      total_v: itemTotals.shoes_v,
    },
    {
      name: "Bags",
      type: "bags",
      total: itemTotals.bags,
      total_v: itemTotals.bags_v,
    },
    {
      name: "Umbrellas",
      type: "umbrellas",
      total: itemTotals.umbrellas,
      total_v: itemTotals.umbrellas_v,
    },
    {
      name: "Wallpaper",
      type: "wallpaper",
      total: itemTotals.wallpaper,
      total_v: itemTotals.wallpaper_v,
    },
    {
      name: "Flooring",
      type: "flooring",
      total: itemTotals.flooring,
      total_v: itemTotals.flooring_v,
    },
    {
      name: "Rugs",
      type: "rugs",
      total: itemTotals.rugs,
      total_v: itemTotals.rugs_v,
    },
    {
      name: "Fossils",
      type: "fossils",
      total: itemTotals.fossils,
      total_v: itemTotals.fossils_v,
    },
    {
      name: "Music",
      type: "music",
      total: itemTotals.music,
      total_v: itemTotals.music_v,
    },
  ];

  const totalVariations = (data) => {
    let count = 0;
    data.forEach((ele) => {
      if (ele.variations.length > 0) count += ele.variations.length;
      else count++;
    });
    return count;
  };

  useEffect(() => {
    dispatch(fetchItemTotals());
  }, [dispatch]);

  const handleCategoryChange = (event) => {
    const select = event.target;
    const selectedIndex = select.selectedIndex;
    const options = select.querySelectorAll("option");
    const name = options[selectedIndex].innerHTML;
    const categoryIndex = categories.findIndex(
      (category) => category.name === name
    );
    setSelectedCategoryIndex(categoryIndex);
  };

  useEffect(() => {
    const category = categories[selectedCategoryIndex];

    if (category.type === "all") {
      setDisplayedList(userList);
    } else {
      const filteredList = userList.filter(
        (item) => item.category === category.type
      );
      setDisplayedList(filteredList);
    }

    setCurrentTotal(category.total || 1);
    setCurrentTotalVariations(category.total_v || 1);
  }, [selectedCategoryIndex, userList]);

  return (
    <Wrapper>
      {popupData && (
        <div className="popup-card">
          <ItemCard itemData={popupData} closeButton={true} />
        </div>
      )}
      <ListSection>
        <h3>Catalogue</h3>
        <select onChange={handleCategoryChange}>
          <option>All</option>
          <optgroup label="Furniture">
            <option>Housewares</option>
            <option>Misc.</option>
            <option>Wall-mounted</option>
          </optgroup>
          <optgroup label="Clothing">
            <option>Tops</option>
            <option>Bottoms</option>
            <option>Dress-up</option>
            <option>Headwear</option>
            <option>Accessories</option>
            <option>Socks</option>
            <option>Shoes</option>
            <option>Bags</option>
            <option>Umbrellas</option>
          </optgroup>
          <optgroup label="Other">
            <option>Wallpaper</option>
            <option>Flooring</option>
            <option>Rugs</option>
            <option>Fossils</option>
            <option>Music</option>
          </optgroup>
        </select>
        <CatalogueItemArea displayedList={displayedList} />
      </ListSection>
      <ProgressBarSection>
        <div>
          <CircularProgress
            percent={(displayedList.length / currentTotal) * 100}
            tooltip={`${displayedList.length} / ${currentTotal}`}
            label="Items"
          ></CircularProgress>
        </div>
        <div>
          <CircularProgress
            percent={
              (totalVariations(displayedList) / currentTotalVariations) * 100
            }
            tooltip={`${totalVariations(
              displayedList
            )} / ${currentTotalVariations}`}
            label="Variations"
          ></CircularProgress>
        </div>
      </ProgressBarSection>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  position: relative;

  .popup-card {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: white;
  }

  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

const ProgressBarSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 50px;
  width: 100%;

  div {
    width: 200px;
  }

  @media (max-width: 550px) {
    flex-direction: row;

    div {
      width: 140px;
    }
  }
`;

const ListSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
