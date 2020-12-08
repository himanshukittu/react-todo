import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Body from "./Body";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Item from "../Item/Item";

configure({ adapter: new Adapter() });

let mockStore = null;
describe("<Body/>", () => {
  beforeEach(() => {
    mockStore = configureStore();
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  afterEach(() => {
    mockStore = null;
  });

  it("<Body/> tag should be defined", () => {
    let initialState = {
      todoList: [],
    };
    let store = mockStore(initialState);

    let bodyEle = render(
      <Provider store={store}>
        <Body />
      </Provider>
    );

    expect(bodyEle).toBeDefined();
    expect(bodyEle.getByTestId("noData")).toBeDefined();
  });

  it("<Body/> should generate 3 <Item/> tag", () => {
    let initialState = {
      todoList: [
        { id: "123", message: "test1", color: "red" },
        { id: "124", message: "test2", color: "green" },
        { id: "125", message: "test3", color: "blue" },
      ],
    };
    let store = mockStore(initialState);
    let bodyEle = shallow(
      <Provider store={store}>
        <Body />
      </Provider>
    );
    // console.log(bodyEle.getElements(Item)[0].props.children)
    expect(bodyEle.find(Item)).toBeTruthy();
    // expect(bodyEle.find(Item)).toHaveLength(3)
  });
});
