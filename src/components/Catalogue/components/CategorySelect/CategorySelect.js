import React from "react";
import useCategorySelect from "./useCategorySelect";

export default function CategorySelect() {
  const { handleCategoryChange } = useCategorySelect();
  return (
    <select onChange={handleCategoryChange}>
      <option value="All">All</option>
      <optgroup label="Furniture">
        <option value="Housewares">Housewares</option>
        <option value="Misc.">Misc.</option>
        <option value="Wall-mounted">Wall-mounted</option>
      </optgroup>
      <optgroup label="Clothing">
        <option value="Tops">Tops</option>
        <option value="Bottoms">Bottoms</option>
        <option value="Dress-up">Dress-up</option>
        <option value="Headwear">Headwear</option>
        <option value="Accessories">Accessories</option>
        <option value="Socks">Socks</option>
        <option value="Shoes">Shoes</option>
        <option value="Bags">Bags</option>
        <option value="Umbrellas">Umbrellas</option>
      </optgroup>
      <optgroup label="Other">
        <option value="Wallpaper">Wallpaper</option>
        <option value="Flooring">Flooring</option>
        <option value="Rugs">Rugs</option>
        <option value="Fossils">Fossils</option>
        <option value="Music">Music</option>
      </optgroup>
    </select>
  );
}
