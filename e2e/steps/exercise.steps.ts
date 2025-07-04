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

When(
  "I fill the exercise title with {string}",
  async function ({ exercisePo }, title) {
    await exercisePo.titleInput.fill(title);
  }
);

When(
  "I fill the exercise history with {string}",
  async function ({ exercisePo }, history) {
    await exercisePo.historyInput.fill(history);
  }
);

When('I click on "Créer"', async function ({ exercisePo }) {
  await exercisePo.submitButton.click();
});

Then(
  "I should see the exercise {string} in the list",
  async function ({ exercisePo }, title) {
    await exercisePo.shouldDisplayText(title);
  }
);

Given(
  "I have created an exercise titled {string}",
  async function ({ exercisePo }, title) {
    await exercisePo.addExerciseButton.click();
    await exercisePo.titleInput.fill(title);
    await exercisePo.historyInput.fill("Contenu de l'exercice");
    await exercisePo.submitButton.click();
  }
);

When("I select the exercise {string}", async function ({ exercisePo }, title) {
  await exercisePo.clickOnCard(title);
});

When(
  "I add a turn with comment {string}",
  async function ({ exercisePo }, comment) {
    await exercisePo.turnButton.click();
    await exercisePo.paragraphInput.fill(comment);
    await exercisePo.submitTurnButton.click();
  }
);

Then(
  "I should see {string} in the exercise details",
  async function ({ exercisePo }, comment) {
    await exercisePo.shouldDisplayText(comment);
  }
);

Then(
  "I delete the exercise {string}",
  async function ({ exercisePo, dashboardPo }, title) {
    await dashboardPo.goTo("dashboard");
    await exercisePo.clickOnCard(title);
    await exercisePo.deleteExercise();
  }
);
