import React from "react";
import data from "./rushing.json";
import Fuse from "fuse.js";

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

    if (filterOn1 && typeof filterOn1 === 'string') {
      if (filterOn1.includes('T')) {
        filterOn1 = filterOn1.replace('T', '')
      }
      if (filterOn1.includes(',')) {
        filterOn1 = filterOn1.replace(',', '');
      }
    }
    if (filterOn2 && typeof filterOn2 === 'string') {
      if (filterOn2.includes('T')) {
        filterOn2 = filterOn2.split('T')[0]
      }
      if (filterOn2.includes(',')) {
        filterOn2 = filterOn2.replace(',', '');
      }
    }

    if (sortOrder === 0) {
      return Number(filterOn1) <= Number(filterOn2)
    }
    return Number(filterOn1) > Number(filterOn2)
  })
}

const PlayerList = ({ players }) =>
  players.map((player, i) => {
    const playerName = player["Player"];
    const totalRushingYards = player["Yds"];
    const longestRush = player["Lng"];
    const totalRushingTouchdowns = player["TD"];
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center"
        }}
        key={playerName + i}
      >
        <span>{playerName}</span>
        <span>{totalRushingYards}</span>
        <span>{longestRush}</span>
        <span>{totalRushingTouchdowns}</span>
      </div>
    );
  });

function App() {
  const [playerSearch, setPS] = React.useState("");
  const debouncedPS = useDebounce(playerSearch, 750);
  let [results, setResults] = React.useState(data);
  const [filterKey, setFilterKey] = React.useState("");
  // 0 for ascending, 1 descending
  const [sortOrder, setSortOrder] = React.useState(0);

  React.useEffect(() => {
    const options = {
      keys: ["Player", "Yds", "Lng", "TD"],
      threshold: 0.33
    };
    const fuse = new Fuse(data, options);
    if (debouncedPS) {
      const searchResults = fuse.search(debouncedPS);
      setResults(searchResults);
    } else {
      setResults(data);
    }
  }, [debouncedPS]);

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
    const keys = Object.keys(data[0])
    const columnDelimiter = ',';
    const lineDelimiter = '\n';

    if (data === null || !data.length) {
      return null;
    }

    let result = ''
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(item => {
      let counter = 0;
      keys.forEach(key => {
        if (counter > 0) {
          result += columnDelimiter;
        }

        if (item[key] && typeof item[key] === 'string' && item[key].includes(',')) {
          result += item[key].replace(',', '');
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
    const csvData = "data:text/csv;charset=utf-8," + prepareCSV(data)
    const encodedUri = encodeURI(csvData)
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "NFL Rushing Stats.csv");
    document.body.appendChild(link);

    link.click()
  }

  results = sortResults(results, filterKey, sortOrder)

  return (
    <>
      <input value={playerSearch} onChange={e => setPS(e.target.value)} />
      <button onClick={() => console.log(exportCSV(results))}>Download CSV</button>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <span>Player</span>
        <span onClick={() => updatePlayerSort("Yds")}>
          Total Rushing Yards {showSortOrder("Yds")}
        </span>
        <span onClick={() => updatePlayerSort("Lng")}>
          Longest Rush {showSortOrder("Lng")}
        </span>
        <span onClick={() => updatePlayerSort("TD")}>
          Total Rushing Touchdowns {showSortOrder("TD")}
        </span>
      </div>
      <PlayerList players={results} />
    </>
  );
}

export default App;
