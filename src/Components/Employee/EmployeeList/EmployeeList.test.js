import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("<EmployeeList/>", () => {
  it("sample", () => {
    expect(1 - 1).toBe(0);
  });
});
