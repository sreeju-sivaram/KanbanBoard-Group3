import React from "react";
import { shallow } from "enzyme";
import KanbanBoard from "./KanbanBoard";
import CustomInput from "./CustomInput";

describe("KanbanBoard", () => {
    it("renders without crashing without props", () => {
    const wrapper = shallow(<KanbanBoard />);
    expect(wrapper.exists()).toBe(true);
    });

    it("renders CustomInput component", () => {
        const wrapper = shallow(<KanbanBoard />);
        const customInput = wrapper.find(CustomInput);
        expect(customInput.exists()).toBe(true);
    });

    it("renders CustomInput with correct props", () => {
        const wrapper = shallow(<KanbanBoard />);
        const customInput = wrapper.find(CustomInput);
        expect(customInput.prop('placeholder')).toEqual('Enter Board Name');
        expect(customInput.prop('buttonText')).toEqual('Add Board');
    });
});