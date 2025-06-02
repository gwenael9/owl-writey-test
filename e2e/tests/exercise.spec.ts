import { test, expect } from "@playwright/test";
import { login, logout } from "../helpers/auth";
import { createExercise, deleteExercise, Exercise } from "../helpers/exercise";

const exercise: Exercise = {
  title: "Exercice de test",
  content: "Contenu",
};

test("create a new exercise", async ({ page }) => {
  await login(page);

  await createExercise(page, exercise);
  await deleteExercise(page);

  await logout(page);
});

test("create and add tour", async ({ page }) => {
  await login(page);
  await createExercise(page, exercise);

  const addTour = page.getByRole("button").filter({ hasText: "À mon tour !" });
  await expect(addTour).toBeVisible();
  await addTour.click();

  await expect(
    page.getByRole("heading", { name: "À vous de jouer !", level: 2 })
  ).toBeVisible();

  const textArea = page.locator('p[data-placeholder="Type here..."]');
  await expect(textArea).toBeVisible();
  await textArea.fill("Mon texte de test");

  const submitButton = page.getByRole("button", { name: "Soumettre" });
  await expect(submitButton).toBeVisible();
  await submitButton.click();

  // Vérifier que le contenu de l'exercice est visible
  await expect(page.getByText("Mon texte de test")).toBeVisible();
});
