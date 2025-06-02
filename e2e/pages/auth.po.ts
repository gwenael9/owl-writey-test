import { expect, Locator, Page, request } from "@playwright/test";
import { Auth, E2EUser, userName } from "../tools/Auth";
import { BasePo } from "./base.po";
import { baseUrl } from "../utils/url";

abstract class AuthPagePo extends BasePo {
  protected abstract pageSelector: string;
  protected abstract formFields: Record<string, string>;
  protected abstract submitButtonText: string;

  get pageLocator(): Locator {
    return this.page.locator(this.pageSelector);
  }

  get submitButton(): Locator {
    return this.pageLocator.getByRole("button", {
      name: this.submitButtonText,
    });
  }

  constructor(page: Page) {
    super(page);
  }

  async goTo(path: string): Promise<void> {
    await this.page.goto(`${baseUrl}/${path}`);
  }

  async shouldBeDisplayed(): Promise<void> {
    await expect(this.pageLocator).toBeVisible();
  }

  async fillForm(data: Record<string, string>): Promise<void> {
    for (const [field, value] of Object.entries(data)) {
      const locator = this.pageLocator.locator(`input[name=${field}]`);
      await locator.fill(value);
    }
  }

  async shouldDisplayHeaderAndForm(headerText: string): Promise<void> {
    expect(await this.page.locator("h2").innerText()).toContain(headerText);
    for (const field of Object.values(this.formFields)) {
      await expect(
        this.pageLocator.locator(`input[name=${field}]`)
      ).toBeVisible();
    }
    await expect(this.submitButton).toBeVisible();
  }
}

export class LoginPo extends AuthPagePo {
  protected pageSelector = ".login-page";
  protected formFields = {
    login: "login",
    password: "password",
  };
  protected submitButtonText = "Connexion";
  private auth = new Auth();

  get loginInput(): Locator {
    return this.pageLocator.locator("input[name=login]");
  }

  get passwordInput(): Locator {
    return this.pageLocator.locator("input[name=password]");
  }

  async goTo(): Promise<void> {
    await super.goTo("login");
  }

  async shouldDisplayHeaderAndForm(): Promise<void> {
    await super.shouldDisplayHeaderAndForm("Connexion");
  }

  async logAs(login: string, password: string): Promise<void> {
    await this.fillForm({ login, password });
    await this.submitButton.click();
  }

  async logAsUser(
    user: (typeof userName)[keyof typeof userName]
  ): Promise<void> {
    const userInfo = this.auth.getUser(user);
    await this.logAs(userInfo.email, userInfo.password);
  }

  async logAsBadUser(login: string, password: string): Promise<void> {
    await this.fillForm({ login, password });
    await expect(this.submitButton).toBeDisabled();
  }
}

export class RegisterPo extends AuthPagePo {
  protected pageSelector = ".register-page";
  protected formFields = {
    name: "name",
    email: "email",
    password: "password",
  };
  protected submitButtonText = "Inscription";
  private auth = new Auth();

  get nameInput(): Locator {
    return this.pageLocator.locator("input[name=name]");
  }

  get emailInput(): Locator {
    return this.pageLocator.locator("input[name=email]");
  }

  get passwordInput(): Locator {
    return this.pageLocator.locator("input[name=password]");
  }

  get confirmPasswordInput(): Locator {
    return this.pageLocator.getByLabel("Répéter le mot de passe");
  }

  async goTo(): Promise<void> {
    await super.goTo("register");
  }

  async shouldDisplayHeaderAndForm(): Promise<void> {
    await super.shouldDisplayHeaderAndForm("Inscription");
  }

  async registerAs(user: E2EUser): Promise<void> {
    await this.fillForm({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    await this.confirmPasswordInput.fill(user.password);
    await this.submitButton.click();
  }

  async getTokenAndUserId(): Promise<{ idToken: string; localId: string }> {
    const response = await this.page.waitForResponse((response) =>
      response
        .url()
        .includes("identitytoolkit.googleapis.com/v1/accounts:signUp")
    );

    const { localId, idToken } = await response.json();
    return { localId, idToken };
  }

  async deleteUser(user: E2EUser): Promise<void> {
    if (!user.localId || !user.idToken) {
      throw new Error(
        "localId et idToken sont requis pour supprimer l'utilisateur"
      );
    }

    const context = await request.newContext();
    const response = await context.delete(
      `${baseUrl}/api/users/${user.localId}`,
      {
        headers: {
          Authorization: `Bearer ${user.idToken}`,
        },
      }
    );

    if (!response.ok()) {
      throw new Error(
        `Erreur lors de la suppression de l'utilisateur: ${response.statusText()}`
      );
    }

    await context.dispose();
  }
}
