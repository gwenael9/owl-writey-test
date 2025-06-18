import { expect, Locator, Page } from "@playwright/test";
import { BasePo } from "./base.po";

export class ExercicePo extends BasePo {
  constructor(page: Page) {
    super(page);
  }

  get pageLocator(): Locator {
    return this.page.locator(".exercice-new-page");
  }

  async shouldBeDisplayed(): Promise<void> {
    await expect(this.pageLocator).toBeVisible();
  }
}
