import useCategorySelect from "./useCategorySelect";
import CategorySelect from "./CategorySelect";
import React from "react";
import { render, fireEvent } from "@testing-library/react";

const handeCategoryChangeMock = jest.fn();

jest.mock("./useCategorySelect");
useCategorySelect.mockReturnValue({
  handleCategoryChange: handeCategoryChangeMock,
});

describe("CategorySelect", () => {
  it("default selected value is 'All'", () => {
    const { getByDisplayValue } = render(<CategorySelect />);
    const select = getByDisplayValue("All");
    expect(select).toBeInTheDocument();
  });

  it("changing select should change the displayed value", () => {
    const { getByDisplayValue } = render(<CategorySelect />);
    const select = getByDisplayValue("All");
    expect(select).toBeInTheDocument();
    fireEvent.change(select, { target: { value: "misc" } });
    expect(getByDisplayValue("Misc.")).toBeInTheDocument();
  });

  it("select should call handleCategoryChange on change", () => {
    const { getByDisplayValue } = render(<CategorySelect />);
    const select = getByDisplayValue("All");
    fireEvent.change(select, { target: { value: "misc" } });
    expect(handeCategoryChangeMock).toHaveBeenCalled();
  });
});
