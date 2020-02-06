import axios from "axios";

export async function fetchPlayers({
  entries = 10,
  page = 1,
  search = ""
} = {}) {
  return await axios.get("http://localhost:8000/rushing", {
    params: { entries, page, search }
  });
}

export async function getPlayer(name) {
  return await axios.get("http://localhost:8000/player", {
    params: { name }
  });
}
