import React from "react";
import { shallow } from "enzyme";
import BarthelBot from "./BarthelBot";

describe("BarthelBot", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<BarthelBot />);
    expect(wrapper).toMatchSnapshot();
  });
});
