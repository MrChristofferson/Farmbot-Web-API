import * as React from "react";
import { ToolBayForm } from "../toolbay_form";
import { mount } from "enzyme";
import { mapStateToProps } from "../../state_to_props";
import { fakeState } from "../../../__test_support__/fake_state";

describe("<ToolBayForm/>", () => {
  function bootstrapTest() {
    let state = fakeState();
    let toggle = jest.fn();
    let props = mapStateToProps(state);
    let dispatch = jest.fn();
    return {
      state,
      toggle,
      props,
      dispatch,
      component: mount(<ToolBayForm
        toggle={toggle}
        dispatch={dispatch}
        toolSlots={props.toolSlots}
        getToolSlots={props.getToolSlots}
        getChosenToolOption={props.getChosenToolOption}
        getToolOptions={props.getToolOptions}
        changeToolSlot={props.changeToolSlot}
        position={{ x: 1, y: 2, z: 3 }} />)
    };
  }

  it("renders ToolSlot", () => {
    let test = bootstrapTest();
    let inputs = test.component.find("input");
    expect(inputs.length).toEqual(3);
    expect(test.component.text()).toContain("Trench Digging Tool");
    expect(inputs.at(0).props().value).toEqual("10");
    expect(inputs.at(1).props().value).toEqual("10");
    expect(inputs.at(2).props().value).toEqual("10");
  });

  it("fills inputs with bot position", () => {
    let test = bootstrapTest();
    let buttons = test.component.find("button");
    expect(buttons.length).toEqual(6);
    buttons.at(3).simulate("click");
    let argList = test.dispatch.mock.calls[0][0].payload.update;
    expect(argList.x).toEqual(1);
    expect(argList.y).toEqual(2);
    expect(argList.z).toEqual(3);
  });

});
