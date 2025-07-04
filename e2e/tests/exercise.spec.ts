import { test } from "@playwright/test";
import { LoginPo } from "../pages/auth.po";
import { userName } from "../tools/Auth";
import { DashboardPo } from "../pages/dashboard.po";
import { ExercisePo } from "../pages/exercise.po";

const exercise = {
  title: "Exercise de test",
  content: "Contenu",
};

test.describe("Exercise", () => {
  let loginPo: LoginPo;
  let dashboardPo: DashboardPo;
  let exercisePo: ExercisePo;

  test.beforeEach(async ({ page }) => {
    loginPo = new LoginPo(page);
    dashboardPo = new DashboardPo(page);
    exercisePo = new ExercisePo(page);

    await loginPo.goTo();
    await loginPo.logAsUser(userName.TOTO);
    await dashboardPo.shouldBeDisplayed();
    await exercisePo.addExerciseButton.click();
    await exercisePo.shouldDisplayText("Nouvel exercice");
  });

  test("create a new exercise", async ({ page }) => {});

  test("create and add tour", async ({ page }) => {
  //   await login(page);
  //   await createExercise(page, exercise);

  //   const addTour = page
  //     .getByRole("button")
  //     .filter({ hasText: "À mon tour !" });
  //   await expect(addTour).toBeVisible();
  //   await addTour.click();

  //   await expect(
  //     page.getByRole("heading", { name: "À vous de jouer !", level: 2 })
  //   ).toBeVisible();

  //   const textArea = page.locator('p[data-placeholder="Type here..."]');
  //   await expect(textArea).toBeVisible();
  //   await textArea.fill("Mon texte de test");

  //   const submitButton = page.getByRole("button", { name: "Soumettre" });
  //   await expect(submitButton).toBeVisible();
  //   await submitButton.click();

  //   // Vérifier que le contenu de l'exercise est visible
  //   await expect(page.getByText("Mon texte de test")).toBeVisible();
  });
});
