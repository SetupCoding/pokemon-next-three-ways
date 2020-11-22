import { LoadMore } from "../components";
import React from "react";
import { testSnapshot } from "../utils/testUtils";

describe("<LoadMore />", () => {
  it("renders the LoadMore component correctly", () => {
    testSnapshot(<LoadMore setPage={() => {}} />);
  });
});
