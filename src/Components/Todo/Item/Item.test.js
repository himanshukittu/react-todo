import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-test-renderer";
import Item from "./Item";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";

let container = null;
let mockStore = null;

describe("<Item/>",()=>{
    
    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement("div");
        document.body.appendChild(container);
        mockStore = configureStore();
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
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
        container = null;
    });
      

    it("<Item/> tag should be populated with id=1 and content=testing",()=>{
        let initialState={};
        let store = mockStore(initialState);
        let data = {message:"testing",id:"1234"}

        let ele = render(<Provider store={store}><Item counter={1} data={data}/></Provider>);

        expect(ele.baseElement.querySelector('input').value).toBe("testing");
        expect(ele.baseElement.querySelector('span').innerHTML).toContain("1.&nbsp;");
    });

    it("<Item/> tag should call close function on click of 'X'",()=>{
        let initialState={};
        let store = mockStore(initialState);
        let data = {message:"testing", id:"1"}
        
        render(<Provider store={store}><Item counter={1} data={data}/></Provider>);

        waitFor(fireEvent.click(screen.getByTestId("close")));
        let action = store.getActions();
        expect(action).toEqual([{type:"REMOVE_TODO", payload:{id:"1"}}]);
    });
})
