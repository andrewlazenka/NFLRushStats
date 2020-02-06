const request = require("supertest");
const app = require("../../index");

describe("Search", () => {
  let server = null;

  beforeAll(done => {
    server = app.listen(done);
  });

  afterAll(done => {
    server.close(done);
  });

  it("should search for players", async () => {
    const res = await request(server)
    .get("/rushing")
    .query({
      entries: 10,
      page: 1,
      search: "Joe"
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("players");
    expect(res.body.players.length).toEqual(3);
  });
})
