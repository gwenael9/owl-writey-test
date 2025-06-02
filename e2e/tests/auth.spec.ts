import { test, expect } from "@playwright/test";
import { LoginPo, RegisterPo } from "../pages/auth.po";
import { DashboardPo } from "../pages/dashboard.po";
import { E2EUser, userName } from "../tools/Auth";

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

test.describe("Register page", () => {
  let registerPo: RegisterPo;
  let dashboardPo: DashboardPo;

  const user: E2EUser = {
    email: "testRegister@mail.com",
    name: "test",
    password: "password",
  };

  test.beforeEach(async ({ page }) => {
    registerPo = new RegisterPo(page);
    dashboardPo = new DashboardPo(page);
    await registerPo.goTo();
  });

  test("should be displayed", async () => {
    await registerPo.shouldBeDisplayed();
    await registerPo.shouldDisplayHeaderAndForm();
  });

  test("should redirect to the dashboard page on successful register", async ({
    page,
  }) => {
    const responsePromise = page.waitForResponse((response) =>
      response
        .url()
        .includes("identitytoolkit.googleapis.com/v1/accounts:signUp")
    );

    // Effectuer l'inscription
    await registerPo.registerAs(user);

    // Attendre et vérifier la réponse
    const response = await responsePromise;
    const { localId, idToken } = await response.json();

    user.localId = localId;
    user.idToken = idToken;

    await dashboardPo.shouldBeDisplayed();

    // on supprime l'user après l'avoir créé
    await registerPo.deleteUser(user);
  });
});
