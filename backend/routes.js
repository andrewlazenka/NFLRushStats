const routes = require("express").Router();
const Fuse = require("fuse.js");

const data = require("./rushing.json");

routes.get("/health-check", async (req, res) => {
  res.json({
    message: "Service Online"
  });
});

function searchPlayers(query) {
  const fuse = new Fuse(data, {
    keys: ["Player", "Yds", "Lng", "TD"],
    threshold: 0.3
  });
  return fuse.search(query);
}

routes.get("/rushing", async (req, res) => {
  let { entries, page = 1, search } = req.query;
  let players = data;

  const maxPage = Math.ceil(players.length / entries);

  if (page <= 0) {
    res.status(500).json({ message: "Invalid page param passed" });
    return;
  }

  if (search) {
    players = searchPlayers(search);
  } else {
    const subsetPlayers = [];

    if (page > maxPage) page = maxPage;

    for (let i = 0; i < entries; i++) {
      const playerIndex = (page - 1) * entries + i;
      if (players[playerIndex]) subsetPlayers.push(players[playerIndex]);
    }
    players = subsetPlayers;
  }

  res.json({ page, maxPage, players });
});

module.exports = routes;
