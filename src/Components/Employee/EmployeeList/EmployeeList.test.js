import React from "react";
// import { configure, mount, render, shallow } from "enzyme";
import EmployeeList from "./EmployeeList";
import configureStore from "redux-mock-store";
import axios from "axios";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { findByTestId, getByTestId, waitFor } from "@testing-library/react";

const fakePosts = [
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body:
      "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body:
      "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    userId: 1,
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body:
      "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
  },
];
// jest.mock(axios);

// configure({ adapter: new Adapter() });

describe("<EmployeeList/>", () => {
  let mockStore;
  let container = null;
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
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
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    mockStore = null;
    container = null;
  });

  it("should fetch data from api", async () => {
    // // expect.assertions(1);
    // axios.get.mockResolvedValue({ data: fakePosts });
    // // axios.get.mockResolvedValueOnce({ data: fakePosts });
    let initaialState = {};
    let store = mockStore(initaialState);
    // let wrapper = render(
    //   <Provider store={store}>
    //     <EmployeeList />
    //   </Provider>
    // );
    // // await act(() => {
    // //   wrapper = shallow(
    // //     <Provider store={store}>
    // //       <EmployeeList />
    // //     </Provider>
    // //   );
    // // });
    // expect("" + wrapper).toBe(1);
    // console.log(wrapper);
    jest.spyOn(axios, "get").mockImplementation(() => {
      return Promise.resolve({ data: fakePosts });
    });

    await act(() => {
      render(
        <Provider store={store}>
          <EmployeeList />
        </Provider>,
        container
      );
    });

    let ele = await waitFor(() => container.getByTestId("cardss"));
    console.log(ele);
    expect(ele).toBeDefined();
  });
});
