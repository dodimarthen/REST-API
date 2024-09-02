import supertest from "supertest";
import { web } from "../src/application/web.js";
import { prismaCLient } from "../src/application/dbase.js";
import { logger } from "../src/application/logging.js";
import e from "express";

describe("POST /api/users", function () {
  afterEach(async () => {
    await prismaCLient.user.deleteMany({
      where: {
        username: "johndoe12",
      },
    });
  });

  it("should can do register new user", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "johndoe12",
      password: "rahasia",
      name: "John",
    });
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("johndoe12");
    expect(result.body.data.name).toBe("John");
    expect(result.body.data.password).toBeUndefined();
  });

  it("should reject if request invalid", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });

    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject if username is already registered", async () => {
    let result = await supertest(web).post("/api/users").send({
      username: "johndoe12",
      password: "rahasia",
      name: "John",
    });
    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("johndoe12");
    expect(result.body.data.name).toBe("John");
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(web).post("/api/users").send({
      username: "johndoe12",
      password: "rahasia",
      name: "John",
    });
    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});
