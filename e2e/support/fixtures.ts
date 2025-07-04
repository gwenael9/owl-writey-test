import { Page } from "@playwright/test";
import { test as base } from "playwright-bdd";

import { DashboardPo } from "../pages/dashboard.po";
import { ExercisePo } from "../pages/exercise.po";
import { LoginPo, RegisterPo } from "../pages/auth.po";

interface Pages {
  dashboardPo: DashboardPo;
  loginPo: LoginPo;
  registerPo: RegisterPo;
  exercisePo: ExercisePo;
}

export interface AllFixtures extends Pages {
  page: Page;
}

export const pageFixtures = base.extend<Pages>({
  dashboardPo: async ({ page }, use) => {
    await use(new DashboardPo(page));
  },
  loginPo: async ({ page }, use) => {
    await use(new LoginPo(page));
  },
  registerPo: async ({ page }, use) => {
    await use(new RegisterPo(page));
  },
  exercisePo: async ({ page }, use) => {
    await use(new ExercisePo(page));
  },
});
