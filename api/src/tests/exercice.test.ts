import request from "supertest";
import { baseUrl } from "../url";
import { getId, getExerciceByID, getAllExercices } from "../utils/exercice";
import * as dotenv from "dotenv";

dotenv.config();

const exo = {
  name: "test",
  type: "ExquisiteCorpse",
  config: {
    initialText: "debut",
    iterationDuration: 900,
  },
};

let token: string;
let createdExerciseId: string = "";

async function authenticate(): Promise<string> {
  const url = 'https://www.googleapis.com/';
  const response = await request(url)
    .post("/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDpdYdgvEwYIKGr_rmh37DipL3djZ-KF3k")
    .send({
      email: process.env.EMAIL,
      password: process.env.PASSWORD,
      returnSecureToken: true,
    });

  expect(response.status).toBe(200);
  return response.body.idToken;
}

// avant le lancement des tests, on se connnecte et on stock le token
beforeAll(async () => {
  token = await authenticate();
});

// avant chaque test, on créé un exo
beforeEach(async () => {
  const response = await request(baseUrl)
    .post("/exercises")
    .set("Authorization", `Bearer ${token}`)
    .send(exo);

    expect(response.status).toBe(201);
    const location = response.header["location"];
    createdExerciseId = getId(location);
});

// après chaque test, on supprime l'exo
afterEach(async () => {
  if (createdExerciseId) {
    const responseDelete = await request(baseUrl)
      .delete(`/exercises/${createdExerciseId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(responseDelete.status).toBe(204);
    createdExerciseId = "";
  }
});

describe("exercises", () => {
  it("should get all exercises", async () => {
    const response = await getAllExercices(token);
    expect(response.status).toBe(200);
    expect(response.body.exercises.length).toEqual(1);
  });

  it("should get one exercise", async () => {
    const response = await getExerciceByID(token, createdExerciseId);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(exo.name);
  });

  it("should finish an exercise", async () => {
    const responseFinish = await request(baseUrl)
      .post(`/exercises/${createdExerciseId}/finish`)
      .set("Authorization", `Bearer ${token}`);
    expect(responseFinish.status).toBe(204);

    const responseGet = await getExerciceByID(token, createdExerciseId);
    expect(responseGet.status).toBe(200);
    expect(responseGet.body.status).toBe("Finished");
  });
});


