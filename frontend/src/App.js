import React from "react";
import axios from "axios";
import styled from "styled-components";

import "./index.css";

async function fetchPlayers({ entries = 10, page = 1, search = "" } = {}) {
  return await axios.get("http://localhost:8000/rushing", {
    params: { entries, page, search }
  });
}

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}

function sortResults(players, key, sortOrder) {
  return players.sort((player1, player2) => {
    let filterOn1 = player1[key];
    let filterOn2 = player2[key];

    if (filterOn1 && typeof filterOn1 === "string") {
      if (filterOn1.includes("T")) {
        filterOn1 = filterOn1.replace("T", "");
      }
      if (filterOn1.includes(",")) {
        filterOn1 = filterOn1.replace(",", "");
      }
    }
    if (filterOn2 && typeof filterOn2 === "string") {
      if (filterOn2.includes("T")) {
        filterOn2 = filterOn2.split("T")[0];
      }
      if (filterOn2.includes(",")) {
        filterOn2 = filterOn2.replace(",", "");
      }
    }

    if (sortOrder === 0) {
      return Number(filterOn1) <= Number(filterOn2);
    }
    return Number(filterOn1) > Number(filterOn2);
  });
}

const PlayerList = ({ players }) =>
  players.map((player, i) => {
    const playerName = player["Player"];
    const totalRushingYards = player["Yds"];
    const longestRush = player["Lng"];
    const totalRushingTouchdowns = player["TD"];
    return (
      <tr>
        <td>{playerName}</td>
        <td>{totalRushingYards}</td>
        <td>{longestRush}</td>
        <td>{totalRushingTouchdowns}</td>
      </tr>
    );
  });

const SortCell = styled.th`
  cursor: pointer;
`;

function App() {
  const [playerSearch, setPS] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [maxPage, setMaxPage] = React.useState(0);
  const [entries, setEntries] = React.useState(10);
  const debouncedPS = useDebounce(playerSearch, 750);
  let [results, setResults] = React.useState([]);
  const [filterKey, setFilterKey] = React.useState("");
  // 0 for ascending, 1 descending
  const [sortOrder, setSortOrder] = React.useState(0);

  React.useEffect(() => {
    async function searchRequest() {
      const { data } = await fetchPlayers({
        page,
        entries,
        search: debouncedPS
      });
      setResults(data.players);
      setMaxPage(Number(data.maxPage));
      setPage(Number(data.page));
    }

    searchRequest();
  }, [debouncedPS, page, entries]);

  function updatePlayerSort(key) {
    if (key === filterKey) {
      if (sortOrder === 0) setSortOrder(1);
      if (sortOrder === 1) setSortOrder(0);
    } else {
      setSortOrder(0);
    }
    setFilterKey(key);
  }

  function showSortOrder(key) {
    if (filterKey !== key) {
      return null;
    }
    if (sortOrder === 0) return "^";
    if (sortOrder === 1) return "v";
  }

  function prepareCSV(data) {
    const keys = Object.keys(data[0]);
    const columnDelimiter = ",";
    const lineDelimiter = "\n";

    if (data === null || !data.length) {
      return null;
    }

    let result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(item => {
      let counter = 0;
      keys.forEach(key => {
        if (counter > 0) {
          result += columnDelimiter;
        }

        if (
          item[key] &&
          typeof item[key] === "string" &&
          item[key].includes(",")
        ) {
          result += item[key].replace(",", "");
        } else {
          result += item[key];
        }
        counter++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  function exportCSV(data) {
    const csvData = "data:text/csv;charset=utf-8," + prepareCSV(data);
    const encodedUri = encodeURI(csvData);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "NFL Rushing Stats.csv");
    document.body.appendChild(link);
    link.click();
  }

  results = sortResults(results, filterKey, sortOrder);

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between"
        }}
      >
        <button onClick={() => exportCSV(results)}>Download CSV</button>
        <span>
          <label htmlFor="Entries">Entries Showing</label>
          <select
            id="Entries"
            defaultValue={10}
            onChange={e => setEntries(e.target.value)}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={75}>75</option>
            <option value={100}>100</option>
          </select>
        </span>
        <input
          placeholder="Search Players"
          value={playerSearch}
          onChange={e => setPS(e.target.value)}
        />
      </div>
      <table
        class="table table-striped table-bordered"
        style={{ width: "100%" }}
      >
        <thead>
          <tr>
            <th>Player</th>
            <SortCell onClick={() => updatePlayerSort("Yds")}>
              Total Rushing Yards {showSortOrder("Yds")}
            </SortCell>
            <SortCell onClick={() => updatePlayerSort("Lng")}>
              Longest Rush {showSortOrder("Lng")}
            </SortCell>
            <SortCell onClick={() => updatePlayerSort("TD")}>
              Total Rushing Touchdowns {showSortOrder("TD")}
            </SortCell>
          </tr>
        </thead>
        <tbody>
          <PlayerList players={results} />
        </tbody>
      </table>
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <span>
          <button
            disabled={page === 1}
            onClick={() => page !== 1 && setPage(page - 1)}
          >
            Previous
          </button>
          <span>Page {page}</span>
          <button
            disabled={page === maxPage}
            onClick={() => page < maxPage && setPage(page + 1)}
          >
            Next
          </button>
        </span>
      </div>
    </>
  );
}

export default App;
