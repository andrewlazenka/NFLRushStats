import React from "react";
import { render, fireEvent, act, cleanup } from "@testing-library/react";
import PlayerList from "../PlayerList";
const api = require("../api");
const router = require("@reach/router");

afterEach(cleanup);

function mockFetchWithData() {
  api.fetchPlayers = jest.fn(() =>
    Promise.resolve({
      data: {
        players: [
          {
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
          },
          {
            Player: "Shaun Hill",
            Team: "MIN",
            Pos: "QB",
            Att: 5,
            "Att/G": 1.7,
            Yds: 5,
            Avg: 1,
            "Yds/G": 1.7,
            TD: 0,
            Lng: "9",
            "1st": 0,
            "1st%": 0,
            "20+": 0,
            "40+": 0,
            FUM: 0
          },
          {
            Player: "Breshad Perriman",
            Team: "BAL",
            Pos: "WR",
            Att: 1,
            "Att/G": 0.1,
            Yds: 2,
            Avg: 2,
            "Yds/G": 0.1,
            TD: 0,
            Lng: "2",
            "1st": 0,
            "1st%": 0,
            "20+": 0,
            "40+": 0,
            FUM: 0
          },
          {
            Player: "Charlie Whitehurst",
            Team: "CLE",
            Pos: "QB",
            Att: 2,
            "Att/G": 2,
            Yds: 1,
            Avg: 0.5,
            "Yds/G": 1,
            TD: 0,
            Lng: "2",
            "1st": 0,
            "1st%": 0,
            "20+": 0,
            "40+": 0,
            FUM: 0
          },
          {
            Player: "Lance Dunbar",
            Team: "DAL",
            Pos: "RB",
            Att: 9,
            "Att/G": 0.7,
            Yds: 31,
            Avg: 3.4,
            "Yds/G": 2.4,
            TD: 1,
            Lng: "10",
            "1st": 3,
            "1st%": 33.3,
            "20+": 0,
            "40+": 0,
            FUM: 0
          },
          {
            Player: "Mark Ingram",
            Team: "NO",
            Pos: "RB",
            Att: 205,
            "Att/G": 12.8,
            Yds: "1,043",
            Avg: 5.1,
            "Yds/G": 65.2,
            TD: 6,
            Lng: "75T",
            "1st": 49,
            "1st%": 23.9,
            "20+": 4,
            "40+": 2,
            FUM: 2
          },
          {
            Player: "Reggie Bush",
            Team: "BUF",
            Pos: "RB",
            Att: 12,
            "Att/G": 0.9,
            Yds: -3,
            Avg: -0.3,
            "Yds/G": -0.2,
            TD: 1,
            Lng: 5,
            "1st": 2,
            "1st%": 16.7,
            "20+": 0,
            "40+": 0,
            FUM: 1
          },
          {
            Player: "Lucky Whitehead",
            Team: "DAL",
            Pos: "WR",
            Att: 10,
            "Att/G": 0.7,
            Yds: "1,043",
            Avg: 8.2,
            "Yds/G": 5.5,
            TD: 0,
            Lng: "26",
            "1st": 4,
            "1st%": 40,
            "20+": 1,
            "40+": 0,
            FUM: 1
          },
          {
            Player: "Brett Hundley",
            Team: "GB",
            Pos: "QB",
            Att: 3,
            "Att/G": 0.8,
            Yds: -2,
            Avg: -0.7,
            "Yds/G": -0.5,
            TD: 0,
            Lng: 0,
            "1st": 0,
            "1st%": 0,
            "20+": 0,
            "40+": 0,
            FUM: 1
          },
          {
            Player: "Tyreek Hill",
            Team: "KC",
            Pos: "WR",
            Att: 24,
            "Att/G": 1.5,
            Yds: 267,
            Avg: 11.1,
            "Yds/G": 16.7,
            TD: 3,
            Lng: "70T",
            "1st": 10,
            "1st%": 41.7,
            "20+": 4,
            "40+": 2,
            FUM: 0
          }
        ],
        page: "1",
        maxPage: 33
      }
    })
  );
}

function mockFetchWithDataNextPage() {
  api.fetchPlayers = jest.fn(() =>
    Promise.resolve({
      data: {
        players: [
          {
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
          },
          {
            Player: "Shaun Hill",
            Team: "MIN",
            Pos: "QB",
            Att: 5,
            "Att/G": 1.7,
            Yds: 5,
            Avg: 1,
            "Yds/G": 1.7,
            TD: 0,
            Lng: "9",
            "1st": 0,
            "1st%": 0,
            "20+": 0,
            "40+": 0,
            FUM: 0
          },
          {
            Player: "Breshad Perriman",
            Team: "BAL",
            Pos: "WR",
            Att: 1,
            "Att/G": 0.1,
            Yds: 2,
            Avg: 2,
            "Yds/G": 0.1,
            TD: 0,
            Lng: "2",
            "1st": 0,
            "1st%": 0,
            "20+": 0,
            "40+": 0,
            FUM: 0
          },
          {
            Player: "Charlie Whitehurst",
            Team: "CLE",
            Pos: "QB",
            Att: 2,
            "Att/G": 2,
            Yds: 1,
            Avg: 0.5,
            "Yds/G": 1,
            TD: 0,
            Lng: "2",
            "1st": 0,
            "1st%": 0,
            "20+": 0,
            "40+": 0,
            FUM: 0
          },
          {
            Player: "Lance Dunbar",
            Team: "DAL",
            Pos: "RB",
            Att: 9,
            "Att/G": 0.7,
            Yds: 31,
            Avg: 3.4,
            "Yds/G": 2.4,
            TD: 1,
            Lng: "10",
            "1st": 3,
            "1st%": 33.3,
            "20+": 0,
            "40+": 0,
            FUM: 0
          },
          {
            Player: "Mark Ingram",
            Team: "NO",
            Pos: "RB",
            Att: 205,
            "Att/G": 12.8,
            Yds: "1,043",
            Avg: 5.1,
            "Yds/G": 65.2,
            TD: 6,
            Lng: "75T",
            "1st": 49,
            "1st%": 23.9,
            "20+": 4,
            "40+": 2,
            FUM: 2
          },
          {
            Player: "Reggie Bush",
            Team: "BUF",
            Pos: "RB",
            Att: 12,
            "Att/G": 0.9,
            Yds: -3,
            Avg: -0.3,
            "Yds/G": -0.2,
            TD: 1,
            Lng: 5,
            "1st": 2,
            "1st%": 16.7,
            "20+": 0,
            "40+": 0,
            FUM: 1
          },
          {
            Player: "Lucky Whitehead",
            Team: "DAL",
            Pos: "WR",
            Att: 10,
            "Att/G": 0.7,
            Yds: "1,043",
            Avg: 8.2,
            "Yds/G": 5.5,
            TD: 0,
            Lng: "26",
            "1st": 4,
            "1st%": 40,
            "20+": 1,
            "40+": 0,
            FUM: 1
          },
          {
            Player: "Brett Hundley",
            Team: "GB",
            Pos: "QB",
            Att: 3,
            "Att/G": 0.8,
            Yds: -2,
            Avg: -0.7,
            "Yds/G": -0.5,
            TD: 0,
            Lng: 0,
            "1st": 0,
            "1st%": 0,
            "20+": 0,
            "40+": 0,
            FUM: 1
          },
          {
            Player: "Tyreek Hill",
            Team: "KC",
            Pos: "WR",
            Att: 24,
            "Att/G": 1.5,
            Yds: 267,
            Avg: 11.1,
            "Yds/G": 16.7,
            TD: 3,
            Lng: "70T",
            "1st": 10,
            "1st%": 41.7,
            "20+": 4,
            "40+": 2,
            FUM: 0
          }
        ],
        page: "2",
        maxPage: 33
      }
    })
  );
}

function mockSearchData() {
  api.fetchPlayers = jest.fn(() =>
    Promise.resolve({
      data: {
        page: "1",
        maxPage: 33,
        players: [
          {
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
          },
          {
            Player: "Joe Flacco",
            Team: "BAL",
            Pos: "QB",
            Att: 21,
            "Att/G": 1.3,
            Yds: 58,
            Avg: 2.8,
            "Yds/G": 3.6,
            TD: 2,
            Lng: "16",
            "1st": 6,
            "1st%": 28.6,
            "20+": 0,
            "40+": 0,
            FUM: 1
          },
          {
            Player: "Joe Kerridge",
            Team: "GB",
            Pos: "RB",
            Att: 1,
            "Att/G": 0.1,
            Yds: 0,
            Avg: 0,
            "Yds/G": 0,
            TD: 0,
            Lng: "0",
            "1st": 0,
            "1st%": 0,
            "20+": 0,
            "40+": 0,
            FUM: 0
          }
        ]
      }
    })
  );
}

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

it("renders the route", async () => {
  mockFetchWithNoData();
  await act(async () => {
    container = render(<PlayerList />);
  });

  expect(container.getByText(/NFL Rushing Stats/)).toBeInTheDocument();
});

it("cannot click the download button when data has not loaded", async () => {
  mockFetchWithNoData();
  await act(async () => {
    container = render(<PlayerList />);
  });

  const csvButton = container.getByText(/Download CSV/);

  expect(csvButton).toBeInTheDocument();
  expect(csvButton.closest("button")).toHaveAttribute("disabled");
});

it("cannot click the next page button when data has not loaded", async () => {
  mockFetchWithNoData();
  await act(async () => {
    container = render(<PlayerList />);
  });

  const nextPageButton = container.getByText(/Next/);

  expect(nextPageButton).toBeInTheDocument();
  expect(nextPageButton.closest("button")).toHaveAttribute("disabled");
});

it("sorts table rows asc and desc on total rushing yards", async () => {
  mockFetchWithData();
  await act(async () => {
    container = render(<PlayerList />);
  });

  const colHeader = container.getByTestId(/YdsCol/);
  await act(async () => {
    fireEvent.click(colHeader);
  });
  container.getByText(/Total Rushing Yards \^/);

  await act(async () => {
    fireEvent.click(colHeader);
  });
  container.getByText(/Total Rushing Yards v/);

  await act(async () => {
    fireEvent.click(colHeader);
  });
  container.getByText(/Total Rushing Yards \^/);
});

it("sorts table rows asc and desc on longest rush", async () => {
  mockFetchWithData();
  await act(async () => {
    container = render(<PlayerList />);
  });

  const colHeader = container.getByTestId(/LngCol/);
  await act(async () => {
    fireEvent.click(colHeader);
  });
  container.getByText(/Longest Rush \^/);

  await act(() => {
    fireEvent.click(colHeader);
  });
  container.getByText(/Longest Rush v/);

  await act(async () => {
    fireEvent.click(colHeader);
  });
  container.getByText(/Longest Rush \^/);
});

it("sorts table rows asc and desc on total rushing touchdowns", async () => {
  mockFetchWithData();
  await act(async () => {
    container = render(<PlayerList />);
  });

  const colHeader = container.getByTestId(/TdCol/);
  expect(colHeader).toBeInTheDocument();
  await act(async () => {
    fireEvent.click(colHeader);
  });
  container.getByText(/Total Rushing Touchdowns \^/);

  await act(async () => {
    fireEvent.click(colHeader);
  });
  container.getByText(/Total Rushing Touchdowns v/);

  await act(async () => {
    fireEvent.click(colHeader);
  });
  container.getByText(/Total Rushing Touchdowns \^/);
});

it("generates a CSV file from table data", async () => {
  mockFetchWithData();
  await act(async () => {
    container = render(<PlayerList />);
  });

  expect(api.fetchPlayers).toHaveBeenCalled();
  await act(async () => {
    fireEvent.click(container.getByText(/Download CSV/));
  });
  expect(container.getByText(/CSV Download Link/)).toBeInTheDocument();
});

it("searches dataset", async () => {
  jest.useFakeTimers();
  mockFetchWithData();
  await act(async () => {
    container = render(<PlayerList />);
  });
  expect(api.fetchPlayers).toHaveBeenCalled();

  const searchField = container.getByPlaceholderText(/Search Players/);
  mockSearchData();
  await act(async () => {
    fireEvent.change(searchField, { target: { value: "Joe" } });
    jest.runAllTimers();
  });

  expect(api.fetchPlayers).toHaveBeenCalled();
  const results = container.getAllByTestId("tableRow");
  expect(results.length).toEqual(3);
});

it("changes number of entries", async () => {
  mockFetchWithData();
  await act(async () => {
    container = render(<PlayerList />);
  });

  const selectField = container.getByLabelText(/Entries Showing/);
  await act(async () => {
    fireEvent.change(selectField, { target: { value: "25" } });
  });

  expect(selectField.value).toEqual("25");
});

it("changes to the next page and back again", async () => {
  mockFetchWithData();
  await act(async () => {
    container = render(<PlayerList />);
  });

  const nextButton = container.getByText(/Next/);
  mockFetchWithDataNextPage();
  await act(async () => {
    fireEvent.click(nextButton);
  });

  container.getByText(/Page 2/);

  const backButton = container.getByText(/Previous/);
  mockFetchWithData();
  await act(async () => {
    fireEvent.click(backButton);
  });

  container.getByText(/Page 1/);
});

it("changes page after a click on a table row", async () => {
  mockFetchWithData();
  await act(async () => {
    container = render(<PlayerList />);
  });

  const tableRow = container.getAllByTestId(/tableRow/)[0];
  router.navigate = jest.fn();
  await act(async () => {
    fireEvent.click(tableRow);
  });

  expect(router.navigate).toHaveBeenCalled();
});
