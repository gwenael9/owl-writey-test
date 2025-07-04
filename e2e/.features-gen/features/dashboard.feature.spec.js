// Generated from: features\dashboard.feature
import { fixtures as test } from "../../steps/common.steps.ts";

test.describe('Dashboard page', () => {

  test('Display dashboard page', async ({ Given, loginPo, dashboardPo, Then }) => { 
    await Given('I am logged in', null, { loginPo, dashboardPo }); 
    await Then('I should see the dashboard page displayed', null, { dashboardPo }); 
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use('features\\dashboard.feature'),
  $bddFileData: ({}, use) => use(bddFileData),
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am logged in","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Outcome","textWithKeyword":"Then I should see the dashboard page displayed","stepMatchArguments":[]}]},
]; // bdd-data-end