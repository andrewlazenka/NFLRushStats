const routes = require("express").Router();
const Fuse = require("fuse.js");

const rushing = require("./rushing.json");

routes.get("/health-check", async (req, res) => {
  res.json({
    message: "Service Online"
  });
});

function searchPlayers(search) {
  const fuse = new Fuse(rushing, {
    keys: ["Player", "Yds", "Lng", "TD"],
    threshold: 0.3
  });
  return fuse.search(search);
}

function paginate({ data, entries, page } = {}) {
  const dataSubset = [];

  for (let i = 0; i < entries; i++) {
    const dataIndex = (page - 1) * entries + i;
    if (data[dataIndex]) dataSubset.push(data[dataIndex]);
  }
  return dataSubset;
}

routes.get("/rushing", async (req, res) => {
  let { entries, page = 1, search } = req.query;
  let players = rushing;

  const maxPage = Math.ceil(players.length / entries);

  if (page <= 0) {
    res.status(500).json({ message: "Invalid page param passed" });
    return;
  }

  if (page > maxPage) page = maxPage;

  if (search) {
    players = searchPlayers(search);
  } else {
    players = paginate({ data: players, entries, page })
  }

  res.json({ page: Number(page), maxPage, players });
});

module.exports = routes;
