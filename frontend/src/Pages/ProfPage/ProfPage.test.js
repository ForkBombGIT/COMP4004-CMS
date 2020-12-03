import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ProfPage from ".";

Enzyme.configure({ adapter: new Adapter() });

describe("An example describe", () => {
  test("an example test", () => {
    // eslint-disable-next-line
    const wrapper = shallow(<ProfPage />);

    expect(wrapper.exists()).toBe(true);
  });
});
