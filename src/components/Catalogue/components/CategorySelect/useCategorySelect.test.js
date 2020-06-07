import useCategorySelect from "./useCategorySelect";
import { renderHook, act } from "@testing-library/react-hooks";
import { setCategory } from "redux/slices";
import { useDispatch } from "react-redux";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));
const mockUseDispatch = useDispatch;
const mockDispatch = jest.fn();

describe("useCategorySelect", () => {
  mockUseDispatch.mockImplementation(() => mockDispatch);

  describe("useEffect[dispatch]", () => {
    it("should dispatch setCategory('all') to store", () => {
      const { result } = renderHook(() => useCategorySelect());
      expect(mockDispatch).toHaveBeenCalledWith(setCategory("all"));
    });
  });

  describe("handleCategoryChange", () => {
    it("should dispatch setCategory(selectedCategory) to store", () => {
      const { result } = renderHook(() => useCategorySelect());
      const mockedEvent = { target: { value: "misc" } };
      act(() => {
        result.current.handleCategoryChange(mockedEvent);
      });
      expect(mockDispatch).toHaveBeenCalledWith(setCategory("misc"));
    });
  });
});
