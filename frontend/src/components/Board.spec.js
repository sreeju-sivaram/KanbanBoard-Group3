import React from "react";
import { shallow } from "enzyme";
import Board from "./Board";
import CustomInput from "./CustomInput";
import Card from "./Card";


describe("Board", () => {
    const addTaskSpy = jest.fn();
    const removeCardSpy = jest.fn();
    const onDragEndSpy = jest.fn();
    const onDragEnterSpy = jest.fn();
    const updateCardSpy = jest.fn();
    const props = {
        board: {
            id: 1,
            name: 'TODO'
        },
        addTask: addTaskSpy,
        removeCard: removeCardSpy,
        onDragEnd: onDragEndSpy,
        onDragEnter: onDragEnterSpy,
        updateCard: updateCardSpy,
        tasks: [
            {
                id: 1,
                status_id: 1
            }
        ],
    };
    it("renders without crashing with props", () => {
        const wrapper = shallow(<Board {...props}/>);
        expect(wrapper.exists()).toBe(true);
    });

    it("renders child components", () => {
        const wrapper = shallow(<Board {...props}/>);
        const customInput = wrapper.find(CustomInput);
        const card = wrapper.find(Card);
        expect(customInput.exists()).toBe(true);
        expect(card.exists()).toBe(true);
    });

    it("renders CustomInput with correct props", () => {
        const wrapper = shallow(<Board {...props}/>);
        const customInput = wrapper.find(CustomInput);
        expect(customInput.prop('placeholder')).toEqual('Enter Task Title');
        expect(customInput.prop('isAddTask')).toBe(true)
    });

    it("renders Card with correct props", () => {
        const wrapper = shallow(<Board {...props}/>);
        const card = wrapper.find(Card);
        expect(card.prop('task')).toEqual(props.tasks[0]);
        expect(card.prop('boardId')).toEqual(props.board.id);
        expect(card.prop('removeCard')).toEqual(removeCardSpy);
        expect(card.prop('updateCard')).toEqual(updateCardSpy);
    });
});