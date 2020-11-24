import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ModelCreationForm from ".";
import { createModel } from "./ModelCreationForm";

Enzyme.configure({ adapter: new Adapter() });

describe("Testing Model Creation Form", () => {
  test("Component renders", () => {
    // eslint-disable-next-line
    const wrapper = shallow(<ModelCreationForm />);
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
  test("Admin Data Creation", () => {
    const data = {
      name: "Jamie",
      birth_date: undefined,
    };
    const generated = createModel("professor", "Jamie");

    expect(data).toEqual(generated);
  });
  test("Professor Data Creation", () => {
    const data = {
      name: "Jamie",
      birth_date: undefined,
    };
    const generated = createModel("administrator", "Jamie");

    expect(data).toEqual(generated);
  });
});
