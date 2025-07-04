import { baseUrl } from "../url";
import request from "supertest";

export function getId(url: string) {
  return url.replace("/api/exercises", "");
}

export async function getExerciceByID(token: string, id: string) {
  return await request(baseUrl)
    .get(`/exercises/${id}`)
    .set("Authorization", `Bearer ${token}`);
}

export async function getAllExercices(token: string) {
  return await request(baseUrl)
    .get("/exercises")
    .set("Authorization", `Bearer ${token}`);
}

export async function postExquis(
  exoId: string,
  token: string,
  type: string,
  content?: string
) {
  const response = await request(baseUrl)
    .post(`/exquisite-corpse/${exoId}/${type}-turn`)
    .set("Authorization", `Bearer ${token}`)
    .send({ content });

  expect(response.status).toBe(204);
}
