import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AdminCoursePage from ".";

Enzyme.configure({ adapter: new Adapter() });

describe("Admin course page test ", () => {
  test("Ensure that component mounts", () => {
    // eslint-disable-next-line
    const wrapper = shallow(<AdminCoursePage/>);

    expect(wrapper.exists()).toBe(true);
  });
});
