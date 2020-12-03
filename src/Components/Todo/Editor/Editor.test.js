import {  render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Editor from './Editor';
import fireEvent from '@testing-library/user-event'

let mockStore = null;

describe("<Editor/>",()=>{
    beforeEach(()=>{
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
    afterEach(()=>{
        mockStore = null;
    });

    it("should render Editor component",()=>{
        let initialState = {};
        let store = mockStore(initialState);

        let ele = render(<Provider store={store}><Editor/></Provider>);

        expect(ele).toBeDefined();
    });

    it("Should add new TODO/ dispatch ADD_TODO action",()=>{
        let initialState = {};
        let store = mockStore(initialState);

        render(<Provider store={store}><Editor/></Provider>);

        // waitFor(fireEvent.change(screen.getByTestId('editIt'), {target:{value:"testing"}}));
        fireEvent.type(screen.getByTestId('editIt'), "testing");
        expect(screen.getByTestId('editIt')).toHaveValue('testing');
        
        waitFor(fireEvent.click(screen.getByTestId('UT_Add')));

        let action = store.getActions();
        expect(action).toEqual([{ type: "ADD_TODO", payload: "testing" }]);
    });
});