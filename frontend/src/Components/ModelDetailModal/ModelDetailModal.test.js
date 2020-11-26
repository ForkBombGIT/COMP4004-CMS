import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ModelDetailModal from ".";

Enzyme.configure({ adapter: new Adapter() });

describe("Testing User List", () => {
  test("Component renders", () => {
    // eslint-disable-next-line
    const wrapper = shallow(<ModelDetailModal list={[]}/>);
    expect(wrapper.exists()).toBe(true);
  });
});
