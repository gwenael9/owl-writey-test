import request from "supertest";
import { baseUrl } from "../url";

describe("External API Tests", () => {
    it("should return 200 OK for the root endpoint", async () => {
        const response = await request(baseUrl).get("/ping");
        expect(response.status).toBe(200);
    });
});