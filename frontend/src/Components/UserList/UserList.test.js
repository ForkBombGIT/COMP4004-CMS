import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import UserList from ".";

Enzyme.configure({ adapter: new Adapter() });

describe("Testing User List", () => {
  test("Component renders", () => {
    // eslint-disable-next-line
    const wrapper = shallow(<UserList list={[]}/>);
    expect(wrapper.exists()).toBe(true);
  });
});
