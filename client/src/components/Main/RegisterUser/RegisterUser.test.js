import React from "react";
import { shallow } from "enzyme";
import RegisterUser from "./RegisterUser";

describe("RegisterUser", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<RegisterUser />);
    expect(wrapper).toMatchSnapshot();
  });
});
