const request = require("supertest");
const app = require("../../index");

describe("Pagination", () => {
  let server = null;

  beforeAll(done => {
    server = app.listen(done);
  });

  afterAll(done => {
    server.close(done);
  });

  it("should paginate the list of players to 10 entries", async () => {
    const res = await request(server)
      .get("/rushing")
      .query({
        entries: 10,
        page: 1
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("players");
    expect(res.body.players.length).toEqual(10);
  });

  it("should not allow a page number below 1", async () => {
    const res = await request(server)
      .get("/rushing")
      .query({
        entries: 10,
        page: 0
      });

    expect(res.statusCode).toEqual(500);
  });

  it("should set the page number to the max page number if parameter is greater", async () => {
    const res = await request(server)
      .get("/rushing")
      .query({
        entries: 100,
        page: 100
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("maxPage");
    expect(res.body.maxPage).toEqual(4);
  });
});
