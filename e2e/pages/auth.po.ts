import { expect, Locator, Page } from "@playwright/test";

import { Auth, userName } from "../tools/Auth";
import { BasePo } from "./base.po";
import { baseUrl } from "../utils/url";

export class LoginPo extends BasePo {
  private auth = new Auth();
  get pageLocator(): Locator {
    return this.page.locator(".login-page");
  }
  get loginInput(): Locator {
    return this.pageLocator.locator("input[name=login]");
  }
  get passwordInput(): Locator {
    return this.pageLocator.locator("input[name=password]");
  }
  get submitButton(): Locator {
    return this.pageLocator.getByRole("button", {
      name: "Connexion",
    });
  }

  constructor(page: Page) {
    super(page);
  }

  async goTo(): Promise<void> {
    await this.page.goto(`${baseUrl}/login`);
  }

  async shouldBeDisplayed(): Promise<void> {
    await expect(this.pageLocator).toBeVisible();
  }

  async fillForm(login: string, password: string): Promise<void> {
    await this.loginInput.fill(login);
    await this.passwordInput.fill(password);
  }

  async shouldDisplayHeaderAndForm(): Promise<void> {
    expect(await this.page.locator("h2").innerText()).toContain("Connexion");
    await expect(this.loginInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async logAs(login: string, password: string): Promise<void> {
    await this.fillForm(login, password);
    await this.submitButton.click();
  }

  async logAsUser(
    user: (typeof userName)[keyof typeof userName]
  ): Promise<void> {
    const userInfo = this.auth.getUser(user);
    await this.logAs(userInfo.login, userInfo.password);
  }

  async logAsBadUser(login: string, password: string): Promise<void> {
    await this.fillForm(login, password);
    await expect(this.submitButton).toBeDisabled();
  }
}

// pas fini
export class RegisterPo extends BasePo {
  private auth = new Auth();
  get pageLocator(): Locator {
    return this.page.locator(".register-page");
  }
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
  get submitButton(): Locator {
    return this.pageLocator.getByRole("button", {
      name: "Inscription",
    });
  }

  constructor(page: Page) {
    super(page);
  }

  async goTo(): Promise<void> {
    await this.page.goto(`${baseUrl}/login`);
  }

  async shouldBeDisplayed(): Promise<void> {
    await expect(this.pageLocator).toBeVisible();
  }

  async shouldDisplayHeaderAndForm(): Promise<void> {
    expect(await this.page.locator("h2").innerText()).toContain("Connexion");
    await expect(this.loginInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async logAs(login: string, password: string): Promise<void> {
    await this.loginInput.fill(login);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async logAsUser(
    user: (typeof userName)[keyof typeof userName]
  ): Promise<void> {
    const userInfo = this.auth.getUser(user);
    await this.logAs(userInfo.login, userInfo.password);
  }
}
