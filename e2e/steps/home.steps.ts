import { createBdd } from "playwright-bdd";
import { expect } from "@playwright/test";
import { pageFixtures } from "../support/fixtures";

export const fixtures = pageFixtures;
const { Given, When, Then } = createBdd(fixtures);

Then("I should see the home page displayed", async function ({ page }) {
  await expect(page.locator(".home-page")).toBeVisible();
});
