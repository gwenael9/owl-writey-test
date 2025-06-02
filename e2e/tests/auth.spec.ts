import { expect, test } from "@playwright/test";
import { user } from "../helpers/auth";
import { login, logout } from "../helpers/auth";
import { baseUrl } from "../utils/url";

test("register", async ({ page }) => {
  await page.goto(baseUrl);

  // Vérifier la présence de la balise h1 avec le texte spécifié
  await expect(
    page.getByRole("heading", { name: "L'imaginaire à portée de Plume !" })
  ).toBeVisible();

  // Vérifier la présence du bouton d'inscription et cliquer dessus
  const inscriptionButton = page
    .getByRole("button")
    .filter({ hasText: "Inscription" });
  await expect(inscriptionButton).toBeVisible();
  await inscriptionButton.click();

  // Vérifier que nous sommes sur la page d'inscription
  await expect(page).toHaveURL(`${baseUrl}/register`);

  // Remplir le formulaire d'inscription
  await page.getByLabel("Pseudo").fill(user.username);
  await page.getByLabel("Email").fill(user.email);
  await page.locator('input[name="password"]').fill(user.password);
  await page.getByLabel("Répéter le mot de passe").fill(user.password);

  // Cliquer sur le bouton d'inscription du formulaire
  await page.locator("#registerBtn").click();

  // Vérifier que nous sommes sur la page d'accueil
  await expect(page).toHaveURL(`${baseUrl}/dashboard`);
});

test("login and logout", async ({ page }) => {
  await login(page);
  await logout(page);
});
