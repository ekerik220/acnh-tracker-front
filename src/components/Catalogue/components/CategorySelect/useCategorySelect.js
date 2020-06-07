import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "redux/slices";

export default function useCategorySelect() {
  const dispatch = useDispatch();
  const itemTotals = useSelector((state) => state.itemTotals.totals);

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

  // The category list in the DOM isn't in the same order as the category list
  // array that stores all the information about each category so we need some
  // logic to match them up.
  const handleCategoryChange = (event) => {
    const value = event.target.value;
    const category = categories.find((category) => category.name === value);
    dispatch(setCategory(category));
  };

  // On mount, set the selected category in redux to 'All', since that is
  // what is selected by default.
  useEffect(() => {
    dispatch(setCategory(categories[0]));
  }, [dispatch]);

  return { handleCategoryChange };
}
