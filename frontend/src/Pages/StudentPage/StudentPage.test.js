import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import StudentPage from "./";
import Adapter from "enzyme-adapter-react-16"

Enzyme.configure({ adapter: new Adapter() });

describe("An example describe", () => {
    test("an example test", () => {
        const wrapper = shallow(<StudentPage />);

        expect(wrapper.exists()).toBe(true);
    })
});