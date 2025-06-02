import { Page, expect } from "@playwright/test";
import { baseUrl } from "../utils/url";

export const user = {
  email: "teste2e@mail.com",
  username: "username",
  password: "password",
};

export async function login(page: Page) {
  await page.goto(baseUrl);
  const connexionButton = page
    .getByRole("button")
    .filter({ hasText: "Connexion" });
  await expect(connexionButton).toBeVisible();
  await connexionButton.click();
  await expect(page).toHaveURL(`${baseUrl}/login`);
  await page.getByLabel("Email").fill(user.email);
  await page.getByLabel("Mot de passe").fill(user.password);
  await page.locator("#loginBtn").click();
  await expect(page).toHaveURL(`${baseUrl}/dashboard`);
}

export async function logout(page: Page) {
  const deconnexionButton = page
    .getByRole("button")
    .filter({ hasText: "Déconnexion" });
  await expect(deconnexionButton).toBeVisible();
  await deconnexionButton.click();
  await expect(page).toHaveURL(`${baseUrl}/`);
}
