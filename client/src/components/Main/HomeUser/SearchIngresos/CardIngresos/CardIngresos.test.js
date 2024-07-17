import React from "react";
import { shallow } from "enzyme";
import CardIngresos from "./CardIngresos";

describe("CardIngresos", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CardIngresos />);
    expect(wrapper).toMatchSnapshot();
  });
});
