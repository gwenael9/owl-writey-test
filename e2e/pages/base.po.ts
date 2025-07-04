import { expect, Page } from "@playwright/test";
import { baseUrl } from "../utils/url";

export abstract class BasePo {
  protected readonly page: Page;

  protected constructor(page: Page) {
    this.page = page;
  }

  async shouldDisplayText(text: string): Promise<void> {
    await expect(this.page.getByText(text)).toBeVisible();
  }

  async goTo(path: string): Promise<void> {
    await this.page.goto(`${baseUrl}/${path}`);
  }

  async wait(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }
}
