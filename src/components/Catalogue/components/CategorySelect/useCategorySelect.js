import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCategory } from "redux/slices";

export default function useCategorySelect() {
  const dispatch = useDispatch();

  // The category list in the DOM isn't in the same order as the category list
  // array that stores all the information about each category so we need some
  // logic to match them up.
  const handleCategoryChange = (event) => {
    const value = event.target.value;
    dispatch(setCategory(value));
  };

  // On mount, set the selected category in redux to 'All', since that is
  // what is selected by default.
  useEffect(() => {
    dispatch(setCategory("all"));
  }, [dispatch]);

  return { handleCategoryChange };
}
