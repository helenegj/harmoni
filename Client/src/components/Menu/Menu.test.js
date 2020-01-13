import React from "react";
import Menu from "Menu";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
//test

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Menu number={0} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

Enzyme.configure({ adapter: new Adapter() });
it("shallow renders without crashing", () => {
  shallow(<Menu />);
});