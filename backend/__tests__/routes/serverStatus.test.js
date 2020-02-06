const request = require("supertest");
const app = require("../../index");

describe("Server Status", () => {
  let server = null;

  beforeAll(done => {
    server = app.listen(done);
  });

  afterAll(done => {
    server.close(done);
  });

  it("should ensure the app is online", async () => {
    const res = await request(server).get("/health-check");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
  });
})
