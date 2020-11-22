import { ErrorComponent } from "../components";
import React from "react";
import { testSnapshot } from "../utils/testUtils";

describe("<ErrorComponent />", () => {
  it("renders the ErrorComponent component correctly", () => {
    testSnapshot(
      <ErrorComponent
        error={{ status: 404, error: "Not Found", message: "Not Found" }}
      />
    );
  });
});
