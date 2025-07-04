// Generated from: features\exercise.feature
import { fixtures as test } from "../../steps/common.steps.ts";

test.describe('Exercise page', () => {

  test('Display exercise page', async ({ Given, loginPo, dashboardPo, When, exercisePo, Then }) => { 
    await Given('I am logged in', null, { loginPo, dashboardPo }); 
    await When('I click on create exercise button', null, { exercisePo }); 
    await Then('I should see the create exercise title', null, { exercisePo }); 
  });

  test('Create new exercise', async ({ Given, loginPo, dashboardPo, When, page, Then, exercisePo }) => { 
    await Given('I am logged in', null, { loginPo, dashboardPo }); 
    await When('I go to "exercise" page', null, { page }); 
    await Then('I should see the create exercise title', null, { exercisePo }); 
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use('features\\exercise.feature'),
  $bddFileData: ({}, use) => use(bddFileData),
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am logged in","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I click on create exercise button","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then I should see the create exercise title","stepMatchArguments":[]}]},
  {"pwTestLine":12,"pickleLine":8,"tags":[],"steps":[{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"Given I am logged in","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When I go to \"exercise\" page","stepMatchArguments":[{"group":{"start":8,"value":"\"exercise\"","children":[{"start":9,"value":"exercise","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":15,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then I should see the create exercise title","stepMatchArguments":[]}]},
]; // bdd-data-end