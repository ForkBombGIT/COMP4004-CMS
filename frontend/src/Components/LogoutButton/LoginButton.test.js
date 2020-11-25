import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LogoutButton from "./LogoutButton";

Enzyme.configure({ adapter: new Adapter() });

describe("test the logout button", () => {
  test("ensure thedescribe logout button renders", () => {
    // eslint-disable-next-line
    const wrapper = shallow(<LogoutButton />);

    expect(wrapper.exists()).toBe(true);
  });
});
