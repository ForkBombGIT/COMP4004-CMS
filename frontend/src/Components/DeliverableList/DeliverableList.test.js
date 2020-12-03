import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import DeliverableList from ".";

Enzyme.configure({ adapter: new Adapter() });

describe("test the deliverable", () => {
  test("ensure the deliverable renders", () => {
    // eslint-disable-next-line
    const wrapper = shallow(<DeliverableList/>);

    expect(wrapper.exists()).toBe(true);
  });
});
