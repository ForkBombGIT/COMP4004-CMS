import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import StudentCoursePage from ".";

Enzyme.configure({ adapter: new Adapter() });

describe("An example describe", () => {
  test("an example test", () => {
    // eslint-disable-next-line
    const wrapper = shallow(<StudentCoursePage/>);

    expect(wrapper.exists()).toBe(true);
  });
});
