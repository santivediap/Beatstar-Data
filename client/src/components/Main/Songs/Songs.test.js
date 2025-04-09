import React from "react";
import { shallow } from "enzyme";
import Songs from "./Songs";

describe("Songs", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Songs />);
    expect(wrapper).toMatchSnapshot();
  });
});
