import { expect, Locator, Page } from "@playwright/test";
import { BasePo } from "./base.po";
import { Exercise } from "../types/exercice";

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

  get titleInput(): Locator {
    return this.page.getByRole("textbox", { name: "Titre" });
  }

  get historyInput(): Locator {
    return this.page.getByRole("textbox", {
      name: "Écrivez le début de votre",
    });
  }

  get submitButton(): Locator {
    return this.page.getByRole("button", { name: "Valider" });
  }

  get turnButton(): Locator {
    return this.page.getByRole("button", { name: "À mon tour !" });
  }

  get handButton(): Locator {
    return this.page.getByRole("button", { name: "Rendre la main" });
  }

  get deleteButton(): Locator {
    return this.page
      .locator("a")
      .filter({ has: this.page.locator("mat-icon", { hasText: "delete" }) });
  }

  async shouldBeDisplayed(): Promise<void> {
    await expect(this.pageLocator).toBeVisible();
  }

  async goTo(): Promise<void> {
    await this.addExerciseButton.click();
    await this.shouldBeDisplayed();
  }

  async createExercise(exercise: Exercise): Promise<void> {
    await this.titleInput.isVisible();
    await this.historyInput.isVisible();
    await this.submitButton.isVisible();

    await this.titleInput.fill(exercise.title);
    await this.historyInput.fill(exercise.history);
    await this.submitButton.click();
  }

  async deleteExercise(): Promise<void> {
    await this.deleteButton.click();
    await this.shouldDisplayText("Supprimer l'exercice ?");
    await this.page.getByRole("button", { name: "Oui" }).click();
    await this.shouldDisplayText("Exercice supprimé");
  }

  async clickOnCard(exerciceName: string): Promise<void> {
    await this.shouldDisplayText(exerciceName);
    await this.page.getByText(exerciceName).click();
  }
}
