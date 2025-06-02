import { Page, expect } from "@playwright/test";
import { baseUrl } from "../utils/url";

export interface Exercise {
  title: string;
  content: string;
}

export async function createExercise(page: Page, exercise: Exercise) {
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
}

export async function deleteExercise(page: Page) {
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
}
