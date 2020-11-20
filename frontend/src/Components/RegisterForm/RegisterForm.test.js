import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import RegisterForm from ".";
import { createApplication } from "./RegisterForm";

Enzyme.configure({ adapter: new Adapter() });

describe("Testing Register Form", () => {
  test("Component renders", () => {
    // eslint-disable-next-line
    const wrapper = shallow(<RegisterForm />);
    expect(wrapper.exists()).toBe(true);
  });

  test("Create data for submission", () => {
    const data = {
      name: "Jamie",
    };
    const generated = createApplication("Jamie");

    expect(data).toEqual(generated);
  });
});
