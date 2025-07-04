import { createBdd } from "playwright-bdd";
import { AllFixtures, pageFixtures } from "../support/fixtures";

export const fixtures = pageFixtures;
const { Given, When, Then } = createBdd(fixtures);

Then(
  "I should see the dashboard page displayed",
  async function ({ dashboardPo }: AllFixtures) {
    await dashboardPo.shouldBeDisplayed();
  }
);
