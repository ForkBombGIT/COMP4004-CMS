import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SnackBar from "./SnackBar";

Enzyme.configure({ adapter: new Adapter() });

describe("An example describe", () => {
  test("an example test", () => {
    const wrapper = shallow(<SnackBar />);

    expect(wrapper.exists()).toBe(true);
  });
});