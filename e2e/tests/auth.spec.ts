import { expect, test } from "@playwright/test";
import { user } from "../helpers/auth";
import { baseUrl } from "../utils/url";
import { LoginPo } from "../pages/auth.po";
import { DashboardPo } from "../pages/dashboard.po";
import { userName } from "../tools/Auth";

test("register", async ({ page }) => {
  await page.goto(baseUrl);

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

test.describe("Login page", () => {
  let loginPo: LoginPo;
  let dashboardPo: DashboardPo;

  test.beforeEach(async ({ page }) => {
    loginPo = new LoginPo(page);
    dashboardPo = new DashboardPo(page);
    await loginPo.goTo();
  });

  test("should be displayed", async () => {
    await loginPo.shouldBeDisplayed();
    await loginPo.shouldDisplayHeaderAndForm();
  });

  test("should display error if wrong logins are entered", async () => {
    await loginPo.logAsBadUser("wrongLogin", "wrongPassword");
    await loginPo.shouldDisplayText("Le format de l'email est incorrect");
  });

  test("should redirect to the dashboard page on successful login", async () => {
    await loginPo.logAsUser(userName.TOTO);
    await dashboardPo.shouldBeDisplayed();
  });
});
