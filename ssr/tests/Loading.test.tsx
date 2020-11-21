import { Loading } from "../components";
import React from "react";
import { testSnapshot } from "../utils/testUtils";

describe("<Loading />", () => {
  it("renders the Loading component", () => {
    testSnapshot(<Loading />);
  });
  it("renders the Loading component while loading", () => {
    testSnapshot(<Loading isLoading />);
  });
});
