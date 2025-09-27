const { hashPassword } = require("./utils");

describe("Utils", () => {
  test("hashPassword should hash a password", async () => {
    const hashed = await hashPassword("secret");
    expect(hashed).toBeDefined();
    expect(hashed).not.toBe("secret");
  });
});
