import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ProfCoursesPage from ".";

Enzyme.configure({ adapter: new Adapter() });

describe("Prof course page test ", () => {
  test("Ensure that component mounts", () => {
    // eslint-disable-next-line
    const wrapper = shallow(<ProfCoursesPage/>);

    expect(wrapper.exists()).toBe(true);
  });
});
