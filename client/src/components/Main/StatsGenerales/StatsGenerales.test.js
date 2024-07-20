import React from "react";
import { shallow } from "enzyme";
import StatsGenerales from "./StatsGenerales";

describe("StatsGenerales", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<StatsGenerales />);
    expect(wrapper).toMatchSnapshot();
  });
});
