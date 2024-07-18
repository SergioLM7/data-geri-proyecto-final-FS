import React from "react";
import { shallow } from "enzyme";
import RegistrarIngreso from "./RegistrarIngreso";

describe("RegistrarIngreso", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<RegistrarIngreso />);
    expect(wrapper).toMatchSnapshot();
  });
});
