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
let exoId: string = "";

async function authenticate(): Promise<string> {
  const url = 'https://www.googleapis.com/';
  const response = await request(url)
    .post(`/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.API_KEY}`)
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
    exoId = getId(location);
});

// après chaque test, on supprime l'exo
afterEach(async () => {
  if (exoId) {
    const responseDelete = await request(baseUrl)
      .delete(`/exercises/${exoId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(responseDelete.status).toBe(204);
    exoId = "";
  }
});

describe("exercises", () => {
  it("should get all exercises", async () => {
    const response = await getAllExercices(token);
    expect(response.status).toBe(200);
    // on vérifie qu'il y a au moins un exo
    expect(response.body.exercises.length).toBeGreaterThanOrEqual(1);
  });

  it("should get one exercise", async () => {
    const response = await getExerciceByID(token, exoId);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(exo.name);
  });

  it("should finish an exercise", async () => {
    const responseFinish = await request(baseUrl)
      .post(`/exercises/${exoId}/finish`)
      .set("Authorization", `Bearer ${token}`);
    expect(responseFinish.status).toBe(204);

    const responseGet = await getExerciceByID(token, exoId);
    expect(responseGet.status).toBe(200);
    expect(responseGet.body.status).toBe("Finished");
  });
});

describe("cadavre exquis", () => {
  const content = "mon tour";

  it("should submit my turn", async () => {
    await postExquis("take");
    await postExquis("submit", content);
    
    // vérifier le commentaire
    const responseGet = await getExerciceByID(token, exoId);
    expect(responseGet.status).toBe(200);
    expect(responseGet.body.content.scenes[1].text).toBe(content);
  })
})

async function postExquis(type: string, content?: string) {
  const response = await request(baseUrl)
  .post(`/exquisite-corpse/${exoId}/${type}-turn`)
  .set("Authorization", `Bearer ${token}`)
  .send({content})
  
  expect(response.status).toBe(204);
}