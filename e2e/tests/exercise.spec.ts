import { BrowserContext, test } from "@playwright/test";
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

  test("create a new exercise", async () => {
    await exercisePo.createExercise(exercise);
  });

  test("add my turn", async () => {
    await exercisePo.createExercise(exercise);
    await exercisePo.takeTurn("mon nouveau commentaire", exercise.title);
  });

  test.describe("with 2 users", () => {
    let loginPo2: LoginPo;
    let exercisePo2: ExercisePo;

    let context: BrowserContext;

    test.beforeAll(async ({ browser }) => {
      context = await browser.newContext();
      const page2 = await context.newPage();

      loginPo2 = new LoginPo(page2);
      exercisePo2 = new ExercisePo(page2);
    });

    test.afterAll(async () => {
      await context.close();
    });

    test("share my exercice", async () => {
      await exercisePo.createExercise(exercise);
      const urlExercice = await exercisePo.shareExercice();

      await loginPo2.goTo("login");
      await loginPo2.logAsUser(userName.TOTO2);

      await exercisePo2.wait(2000);

      await exercisePo2.getExerciceFromUrl(urlExercice, exercise);
    });
  });
});
