import React from "react";
import useCategorySelect from "./useCategorySelect";

export default function CategorySelect() {
  const { handleCategoryChange } = useCategorySelect();
  return (
    <select onChange={handleCategoryChange}>
      <option value="all">All</option>
      <optgroup label="Furniture">
        <option value="housewares">Housewares</option>
        <option value="misc">Misc.</option>
        <option value="wallmounted">Wall-mounted</option>
      </optgroup>
      <optgroup label="Clothing">
        <option value="tops">Tops</option>
        <option value="bottoms">Bottoms</option>
        <option value="dressup">Dress-up</option>
        <option value="headwear">Headwear</option>
        <option value="accessories">Accessories</option>
        <option value="socks">Socks</option>
        <option value="shoes">Shoes</option>
        <option value="bags">Bags</option>
        <option value="umbrellas">Umbrellas</option>
      </optgroup>
      <optgroup label="Other">
        <option value="wallpaper">Wallpaper</option>
        <option value="flooring">Flooring</option>
        <option value="rugs">Rugs</option>
        <option value="fossils">Fossils</option>
        <option value="music">Music</option>
      </optgroup>
    </select>
  );
}
