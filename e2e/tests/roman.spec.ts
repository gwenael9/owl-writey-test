import { test, expect } from "@playwright/test";
import { LoginPo } from "../pages/auth.po";
import { userName } from "../tools/Auth";
import { DashboardPo } from "../pages/dashboard.po";
import { RomanPo } from "../pages/roman.po";

const roman = {
  title: "Roman de test",
  content: "Contenu",
};

test.describe("Roman", () => {
  let loginPo: LoginPo;
  let dashboardPo: DashboardPo;
  let romanPo: RomanPo;
  let romanTitle = `Roman_${Math.random().toString(36).substring(2, 8)}`;
  const romanDescription = "La description de mon roman.";

  test.beforeEach(async ({ page }) => {
    loginPo = new LoginPo(page);
    dashboardPo = new DashboardPo(page);
    romanPo = new RomanPo(page);

    await loginPo.goTo("login");
    await loginPo.logAsUser(userName.TOTO);
    await dashboardPo.shouldBeDisplayed();
  });

  test("create a new roman with chapters", async ({ page }) => {
    // Vérifie que l'on est sur la page de dashboard
    await dashboardPo.shouldBeDisplayed();
    // On assert que le titre "Mes romans" est visible
    await romanPo.shouldDisplayHeader("Mes romans");
    // On crée un roman
    await romanPo.createRoman(romanTitle, romanDescription);
    // On crée un premier chapitre et on le remplit
    await romanPo.addChapter(
      "Mon premier chapitre",
      "La description de mon premier chapitre.",
      1
    );
    // On rajoute un deuxième chapitre et on le remplit également
    await romanPo.addChapter(
      "Mon deuxième chapitre",
      "La description de mon deuxième chapitre.",
      2
    );
    // On retourne à la page de dashboard
    await romanPo.goTo("dashboard");
    // On vérifie que le roman est bien visible dans la liste des romans
    await dashboardPo.shouldSeeRoman(romanTitle);
  });

  test.afterEach(async ({ page }) => {
    // Nettoyage : on supprime le roman créé
    await romanPo.goTo("dashboard");
    await romanPo.deleteRoman(romanTitle);
  });
});
