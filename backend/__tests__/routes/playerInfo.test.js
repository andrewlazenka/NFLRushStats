const request = require("supertest");
const app = require("../../index");

describe("Find Player Information", () => {
  let server = null;

  beforeAll(done => {
    server = app.listen(done);
  });

  afterAll(done => {
    server.close(done);
  });

  it("should find a player", async () => {
    const res = await request(server)
    .get("/player")
    .query({
      name: "Joe Banyard"
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("Player");
  });

  it("should reject empty name param", async () => {
    const res = await request(server)
    .get("/player")

    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty("message");
  })
})
