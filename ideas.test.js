const request = require("supertest");
const app = require("../server");

describe("Ideas API", () => {
  test("GET /api/ideas should return all ideas", async () => {
    const res = await request(app).get("/api/ideas");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
