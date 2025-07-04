import { createBdd } from "playwright-bdd";
import { expect } from "@playwright/test";
import { AllFixtures, pageFixtures } from "../support/fixtures";
import { userName } from "../tools/Auth";
import { baseUrl } from "../utils/url";

export const fixtures = pageFixtures;
const { Given, When, Then } = createBdd(fixtures);

Given("I am logged in", async function ({ loginPo, dashboardPo }: AllFixtures) {
  await loginPo.goTo("login");
  await loginPo.logAsUser(userName.TOTO);
  await dashboardPo.shouldBeDisplayed();
});

When("I go to {string} page", async function ({ page }, pageName: string) {
  console.log("page", pageName);
  switch (pageName) {
    case "home":
      await page.goto(baseUrl);
      break;
    case "dashboard":
      await page.goto(`${baseUrl}/dashboard`);
      break;
    case "login":
      await page.goto(`${baseUrl}/login`);
      break;
    case "exercise":
      console.log("on passe");
      await page.goto(`${baseUrl}/exercises/new`);
      break;
    default:
      throw new Error("Unknown page: " + pageName);
  }
});
