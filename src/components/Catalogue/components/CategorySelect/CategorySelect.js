import React from "react";
import useCategorySelect from "./useCategorySelect";

export default function CategorySelect() {
  const { handleCategoryChange } = useCategorySelect();

  return (
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
  );
}
