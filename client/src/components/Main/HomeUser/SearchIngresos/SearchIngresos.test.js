import React from "react";
import { shallow } from "enzyme";
import SearchIngresos from "./SearchIngresos";

describe("SearchIngresos", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<SearchIngresos />);
    expect(wrapper).toMatchSnapshot();
  });
});
