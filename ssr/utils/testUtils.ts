import React from "react";
import renderer from "react-test-renderer";

export const testSnapshot = (component) => {
  return expect(renderer.create(component).toJSON()).toMatchSnapshot();
};
