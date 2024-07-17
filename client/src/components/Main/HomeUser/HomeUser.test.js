import React from "react";
import { shallow } from "enzyme";
import HomeUser from "./HomeUser";

describe("Home", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<HomeUser />);
    expect(wrapper).toMatchSnapshot();
  });
});
