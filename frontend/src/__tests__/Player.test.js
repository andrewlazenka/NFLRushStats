import React from "react";
import { render, act, cleanup } from "@testing-library/react";

import Player from "../pages/Player";
const api = require("../modules/api");

afterEach(cleanup);

function mockFetchWithNoData() {
  api.getPlayer = jest.fn(() =>
    Promise.resolve({
      data: {}
    })
  );
}

function mockFetchWithData() {
  api.getPlayer = jest.fn(() =>
    Promise.resolve({
      data: {
        Player: "Joe Banyard",
        Team: "JAX",
        Pos: "RB",
        Att: 2,
        "Att/G": 2,
        Yds: 7,
        Avg: 3.5,
        "Yds/G": 7,
        TD: 0,
        Lng: "7",
        "1st": 0,
        "1st%": 0,
        "20+": 0,
        "40+": 0,
        FUM: 0
      }
    })
  );
}

let container;

it("renders the route without player info", async () => {
  mockFetchWithNoData();
  await act(async () => {
    container = render(<Player />);
  });

  expect(container.getByText(/NFL Rushing Stats/)).toBeInTheDocument();
});

it("renders player information", async () => {
  mockFetchWithData();
  await act(async () => {
    container = render(<Player playerName="Joe Banyard" />);
  });

  expect(container.getByText(/Joe Banyard/)).toBeInTheDocument();
  expect(container.getByText(/Att\/G/)).toBeInTheDocument();
});
