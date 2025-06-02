import { expect, Page } from "@playwright/test";

export abstract class BasePo {
  protected readonly page: Page;

  protected constructor(page: Page) {
    this.page = page;
  }
  async shouldDisplayText(text: string): Promise<void> {
    await expect(this.page.getByText(text)).toBeVisible();
  }
}
