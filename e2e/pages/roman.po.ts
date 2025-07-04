import { expect, Locator, Page } from "@playwright/test";
import { BasePo } from "./base.po";

export class RomanPo extends BasePo {
  constructor(page: Page) {
    super(page);
  }

  get pageLocator(): Locator {
    return this.page.locator(".novel-page");
  }

  async fillForm(data: Record<string, string>): Promise<void> {
    for (const [field, value] of Object.entries(data)) {
      const locator = this.pageLocator.locator(`input[name=${field}]`);
      await locator.fill(value);
    }
  }

  async shouldBeDisplayed(): Promise<void> {
    await expect(this.pageLocator).toBeVisible();
  }

  // Vérifie la présence d'un titre spécifique dans la page
  async shouldDisplayHeader(headerText: string): Promise<void> {
    const header = this.page.getByRole(`heading`, { name: headerText });
    await expect(header).toBeVisible();
  }

  // Navigue vers la page de création de roman
  async goToCreateRoman(): Promise<void> {
    await this.page.goto("/romans/create");
  }

  // Vérifie que le formulaire de création de roman est affiché
  async shouldDisplayCreateForm(): Promise<void> {
    await expect(this.pageLocator.locator("form")).toBeVisible();
    await expect(this.pageLocator.locator('input[name="title"]')).toBeVisible();
    await expect(
      this.pageLocator.locator('textarea[name="description"]')
    ).toBeVisible();
  }

  // Remplit et soumet le formulaire de création de roman
  async createRoman(title: string, description: string): Promise<void> {
    await this.page.locator("#dashboardNovelsAddButton").click();
    await this.page.getByText("Titre du roman").click();
    await this.page
      .getByRole("textbox", { name: "Titre du roman" })
      .fill(title);
    await this.page.getByRole("paragraph").click();
    await this.page.locator("ngx-editor div").nth(1).fill(description);
    await this.page.getByRole("button", { name: "Créer" }).click();
    await expect(
      this.page.getByRole("link", { name: "Table des matières" })
    ).toBeVisible();
    await expect(
      this.page.getByText("Aucun chapitre pour le moment")
    ).toBeVisible();
  }

  // Ajoute un chapitre à un roman
  async addChapter(
    title: string,
    content: string,
    chapterNumber: number
  ): Promise<void> {
    const addChapterBtn = this.page.getByRole("button", {
      name: "Ajouter un chapitre",
    });
    const newChapterBtn = this.page
      .locator("a")
      .filter({ hasText: "add" })
      .nth(chapterNumber);

    if (await addChapterBtn.isVisible()) {
      await addChapterBtn.click();
    } else if (await newChapterBtn.isVisible()) {
      await newChapterBtn.click();
    } else {
      throw new Error(
        "Aucun bouton 'Ajouter un chapitre' ou 'Nouveau chapitre' n'est visible."
      );
    }
    await this.page
      .locator(".chapter-card__title")
      .getByText("Nouveau chapitre")
      .last()
      .fill(title);
    await this.page.locator(".chapter-card__content").last().click();
    await this.page.locator(".chapter-card__content").last().fill(content);
    // Clic sur du texte pour enregistrer la description du chapitre
    await this.page.locator("h2").last().click();
  }

  async deleteRoman(title: string): Promise<void> {
    await this.page
      .locator(".mat-mdc-card-title")
      .filter({ hasText: `${title}` })
      .click();
    await expect(
      this.page.getByRole("link", { name: "Table des matières" })
    ).toBeVisible();
    await this.page.locator("a").filter({ hasText: "settings" }).click();
    await this.page.getByRole("button", { name: "Supprimer" }).click();
    await this.page.getByRole("textbox", { name: "Nom du roman" }).fill(title);
    await this.page.getByRole("button", { name: "Confirmer" }).click();
    await this.page.getByRole("heading", { name: "Mes romans" }).click();
    await expect(
      this.page.locator(".mat-mdc-card-title").filter({ hasText: `${title}` })
    ).not.toBeVisible();
  }
}
