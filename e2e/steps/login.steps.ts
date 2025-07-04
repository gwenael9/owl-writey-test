import { createBdd } from "playwright-bdd";
import { expect } from "@playwright/test";
import { AllFixtures, pageFixtures } from "../support/fixtures";
import { userName } from "../tools/Auth";

export const fixtures = pageFixtures;
const { Given, When, Then } = createBdd(fixtures);

Given("I am on the login page", async function ({ loginPo }: AllFixtures) {
  await loginPo.goTo("login");
});

When(
  "I login with wrong credentials {string} and {string}",
  async function ({ loginPo }: AllFixtures, email: string, password: string) {
    await loginPo.logAsBadUser(email, password);
  }
);

When(
  "I login with user {string}",
  async function ({ loginPo }: AllFixtures, userType: string) {
    const user = userName[userType as keyof typeof userName];
    if (!user) {
      throw new Error(`Unknown user: ${userType}`);
    }
    await loginPo.logAsUser(user);
  }
);

When(
  "I login with email {string} and password {string}",
  async function ({ loginPo }: AllFixtures, email: string, password: string) {
    await loginPo.logAs(email, password);
  }
);

Then(
  "the login page should be displayed",
  async function ({ loginPo }: AllFixtures) {
    await loginPo.shouldBeDisplayed();
  }
);

Then(
  "I should see the header and login form",
  async function ({ loginPo }: AllFixtures) {
    await loginPo.shouldDisplayHeaderAndForm();
  }
);

Then(
  "I should see the error message {string}",
  async function ({ page }: AllFixtures, errorMessage: string) {
    await expect(page.locator("text=" + errorMessage)).toBeVisible();
  }
);

Then(
  "I should be redirected to the dashboard page",
  async function ({ dashboardPo }: AllFixtures) {
    await dashboardPo.shouldBeDisplayed();
  }
);
