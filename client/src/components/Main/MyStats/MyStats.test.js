import React from "react";
import { shallow } from "enzyme";
import MyStats from "./MyStats";

describe("MyStats", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MyStats />);
    expect(wrapper).toMatchSnapshot();
  });
});
