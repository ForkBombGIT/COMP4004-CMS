import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App";

Enzyme.configure({ adapter: new Adapter() });

describe("An example describe", () => {
  test("an example test", () => {
    const wrapper = shallow(<App />); // eslint-disable-line

    expect(wrapper.exists()).toBe(true);
  });
});
