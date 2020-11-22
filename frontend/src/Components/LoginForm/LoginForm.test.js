import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16"
import LoginForm from "./LoginForm";

Enzyme.configure({ adapter: new Adapter() });

describe("An example describe", () => {
  test("an example test", () => {
    const wrapper = shallow(<LoginForm />);

    expect(wrapper.exists()).toBe(true);
  });
});