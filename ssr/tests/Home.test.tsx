import { Home } from "../components";
import React from "react";
import { testSnapshot } from "../utils/testUtils";

describe("<Home />", () => {
  it("renders the Home component correctly", () => {
    testSnapshot(<Home />);
  });
});
