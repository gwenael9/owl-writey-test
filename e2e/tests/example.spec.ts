import { baseUrl } from "./../utils/url";
import { test, expect } from "@playwright/test";
import { login, logout, user } from "../helpers/auth";

const exercise = {
  title: "Exercice de test",
  content: "Contenu",
};

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

test("create a new exercise", async ({ page }) => {
  await login(page);

  // Vérifier que le bouton de création d'exercice avec l'icône est visible
  const createExerciseButtonIcon = page.getByTitle("Créer un exercice");
  await expect(createExerciseButtonIcon).toBeVisible();

  // Cliquer sur le bouton de création d'exercice
  await createExerciseButtonIcon.click();

  // Vérifier que nous sommes sur la page de création d'exercice
  await expect(page).toHaveURL(`${baseUrl}/exercises/new`);

  // Ajouter un exercice
  await page.getByLabel("Titre").fill(exercise.title);
  await page
    .getByLabel("Écrivez le début de votre histoire :")
    .fill(exercise.content);

  // Cliquer sur le bouton de création d'exercice
  const validerButton = page.getByRole("button").filter({ hasText: "Valider" });
  await expect(validerButton).toBeVisible();
  await validerButton.click();

  // Vérifier que l'exercice est visible
  await expect(
    page.getByRole("heading", { name: exercise.title, level: 1 })
  ).toBeVisible();

  // Vérifier que le contenu de l'exercice est visible
  await expect(page.getByText(exercise.content)).toBeVisible();

  // Vérifier que le bouton de suppression est visible
  const deleteExerciseButton = page.getByTitle("Supprimer");
  await expect(deleteExerciseButton).toBeVisible();

  // Cliquer sur le bouton de suppression
  await deleteExerciseButton.click();

  // Vérifier que la div Supprimer est visible
  await expect(page.getByText("Supprimer l'exercice ?")).toBeVisible();

  // Vérifier et cliquer sur le bouton Oui
  const confirmDeleteButton = page.getByRole("button", { name: "Oui" });
  await expect(confirmDeleteButton).toBeVisible();
  await confirmDeleteButton.click();

  // Vérifier que nous sommes redirigés vers le dashboard
  await expect(page).toHaveURL(`${baseUrl}/dashboard`);

  await logout(page);
});
