import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ModelUpdateForm from ".";
import { createModel } from "./ModelUpdateForm";

Enzyme.configure({ adapter: new Adapter() });

describe("Testing Model Creation Form", () => {
  test("Component renders", () => {
    // eslint-disable-next-line
    const wrapper = shallow(<ModelUpdateForm />);
    expect(wrapper.exists()).toBe(true);
  });
  test("Student Data Creation", () => {
    const data = {
      name: "Jamie",
      birth_date: "2020-01-01",
    };
    const generated = createModel("student", "Jamie", "2020-01-01");

    expect(data).toEqual(generated);
  });
});
