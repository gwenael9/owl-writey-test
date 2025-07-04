import { createBdd } from "playwright-bdd";
import { AllFixtures, pageFixtures } from "../support/fixtures";

export const fixtures = pageFixtures;
const { Given, When, Then } = createBdd(fixtures);

When(
  "I click on create exercise button",
  async function ({ exercisePo }: AllFixtures) {
    await exercisePo.addExerciseButton.click();
  }
);

Then(
  "I should see the create exercise title",
  async function ({ exercisePo }: AllFixtures) {
    await exercisePo.shouldDisplayText("Nouvel exercice");
  }
);
