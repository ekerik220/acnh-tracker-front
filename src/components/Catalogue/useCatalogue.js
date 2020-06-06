import React from "react";

export default function useCatalogue() {
  const dispatch = useDispatch();
  const itemTotals = useSelector((state) => state.itemTotals);
  const userList = useSelector((state) => state.user.list);
  const popupData = useSelector((state) => state.popupData);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [displayedList, setDisplayedList] = useState(userList);
  const [currentTotal, setCurrentTotal] = useState(1);
  const [currentTotalVariations, setCurrentTotalVariations] = useState(1);

  return;
}
