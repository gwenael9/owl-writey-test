import { baseUrl } from "../url";
import request from "supertest";

export function getId(url: string) {
  return url.replace('/api/exercises', '');
}

export async function getExerciceByID(token: string, id: string){
  return await request(baseUrl)
    .get(`/exercises/${id}`)
    .set("Authorization", `Bearer ${token}`);
}

export async function getAllExercices(token: string){
  return await request(baseUrl)
    .get("/exercises")
    .set("Authorization", `Bearer ${token}`);
}
