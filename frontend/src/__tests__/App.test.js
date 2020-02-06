import React from "react";
import {
  render,
  act,
  cleanup
} from "@testing-library/react";
import App from "../App";
const api = require("../modules/api");

afterEach(cleanup);

function mockFetchWithNoData() {
  api.fetchPlayers = jest.fn(() =>
    Promise.resolve({
      data: {
        players: []
      }
    })
  );
}

let container;

it("renders the root application", async () => {
  mockFetchWithNoData();
  await act(async () => {
    container = render(<App />);
  });

  expect(container.getByText(/NFL Rushing Stats/)).toBeInTheDocument();
});
