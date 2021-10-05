import React from "react";
import EmployeeList from "./EmployeeList";
import configureStore from "redux-mock-store";
import axios from "axios";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { getByTestId, waitFor } from "@testing-library/react";

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

describe("<EmployeeList/>", () => {
  let mockStore;
  let container = null;
  beforeEach(() => {
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
  });

  it("should fetch data from api", async () => {
    let initaialState = {};
    let store = mockStore(initaialState);
    jest.spyOn(axios, "get").mockImplementation(() => {
      return Promise.resolve({ data: fakePosts });
    });

    act(() => {
      render(
        <Provider store={store}>
          <EmployeeList />
        </Provider>,
        container
      );
    }).then(async ()=>{
      let ele = getByTestId(document,"spinner");
      expect(ele).toBeDefined();
      await waitFor(()=>expect(getByTestId("cardss",document)).toBeDefined())
    });
  });
});
