import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { createModel } from "Utils";
import ModelCRUDForm from ".";

Enzyme.configure({ adapter: new Adapter() });

describe("Testing Model Creation Form", () => {
  test("Component renders", () => {
    // eslint-disable-next-line
    const wrapper = shallow(<ModelCRUDForm />);
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
    const generated = createModel("administrator", "Jamie");

    expect(data).toEqual(generated);
  });
  test("Professor Data Creation", () => {
    const data = {
      name: "Jamie",
      birth_date: undefined,
    };
    const generated = createModel("professor", "Jamie");

    expect(data).toEqual(generated);
  });
  test("Course Data Creation", () => {
    const data = {
      name: "Jamie",
      birth_date: undefined,
      capacity: 10,
      time_slot: "Friday at Noon",
      status: "inprogress",
    };
    const generated = createModel(
      "course",
      "Jamie",
      undefined,
      10,
      "Friday at Noon",
      "inprogress"
    );

    expect(data).toEqual(generated);
  });
  test("Deliverable Data Creation", () => {
    const data = {
      name: "Jamie",
      birth_date: undefined,
      capacity: undefined,
      time_slot: undefined,
      status: undefined,
      weight: 10,
      due_date: "Friday at Noon",
      courseId: "1",
    };
    const generated = createModel(
      "deliverable",
      "Jamie",
      undefined,
      undefined,
      undefined,
      undefined,
      "Friday at Noon",
      10,
      "1"
    );

    expect(data).toEqual(generated);
  });
});
