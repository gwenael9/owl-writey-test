import { expect, test } from "@playwright/test";
import { LoginPo } from "../pages/auth.po";
import { userName } from "../tools/Auth";
import { DashboardPo } from "../pages/dashboard.po";
import { ExercisePo } from "../pages/exercise.po";
import { Exercise } from "../types/exercice";

const exercise: Exercise = {
  title: `Exercise de test ${Date.now()}`,
  history: "Contenu de l'exercice",
};

test.describe("Exercise", () => {
  let loginPo: LoginPo;
  let dashboardPo: DashboardPo;
  let exercisePo: ExercisePo;

  test.beforeEach(async ({ page }) => {
    loginPo = new LoginPo(page);
    dashboardPo = new DashboardPo(page);
    exercisePo = new ExercisePo(page);

    await loginPo.goTo("login");
    await loginPo.logAsUser(userName.TOTO);
    await dashboardPo.shouldBeDisplayed();
    await exercisePo.addExerciseButton.click();
    await exercisePo.shouldDisplayText("Nouvel exercice");
  });

  test.afterEach(async () => {
    await dashboardPo.goTo("dashboard");
    await exercisePo.clickOnCard(exercise.title);
    await exercisePo.deleteExercise();
  });

  test("create a new exercise", async ({ page }) => {
    await exercisePo.createExercise(exercise);
    await expect(page.getByText(exercise.title).first()).toBeVisible();
    await expect(exercisePo.turnButton).toBeVisible();
  });
});
