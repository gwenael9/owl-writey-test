import { expect, Locator, Page } from "@playwright/test";
import { BasePo } from "./base.po";

export class ExercisePo extends BasePo {
  constructor(page: Page) {
    super(page);
  }

  get pageLocator(): Locator {
    return this.page.locator(".exercice-new-page");
  }

  get addExerciseButton(): Locator {
    return this.page
      .getByRole("button")
      .filter({ has: this.page.locator("mat-icon", { hasText: "add" }) })
      .nth(1);
  }

  async shouldBeDisplayed(): Promise<void> {
    await expect(this.pageLocator).toBeVisible();
  }

  async goTo(): Promise<void> {
    await this.addExerciseButton.click();
    await this.shouldBeDisplayed();
  }
}
