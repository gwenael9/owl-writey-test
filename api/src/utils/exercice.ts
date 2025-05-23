import { baseUrl } from "../url";
import request from "supertest";

export function getId(url: string) {
  return url.replace('/api/exercises', '');
}

export async function getExerciceByID(token: string, createdExerciseId?: string){
  return await request(baseUrl)
    .get(`/exercises/${createdExerciseId}`)
    .set("Authorization", `Bearer ${token}`);
}

export async function getAllExercices(token: string){
  return await request(baseUrl)
    .get("/exercises")
    .set("Authorization", `Bearer ${token}`);
}
