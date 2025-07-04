// Generated from: features\login.feature
import { fixtures as test } from "../../steps/common.steps.ts";

test.describe('Login page', () => {

  test('Display login page', async ({ Given, loginPo, Then, And }) => { 
    await Given('I am on the login page', null, { loginPo }); 
    await Then('the login page should be displayed', null, { loginPo }); 
    await And('I should see the header and login form', null, { loginPo }); 
  });

  test('Login attempt with wrong credentials', async ({ Given, loginPo, When, Then, page }) => { 
    await Given('I am on the login page', null, { loginPo }); 
    await When('I login with wrong credentials "wrongLogin" and "wrongPassword"', null, { loginPo }); 
    await Then('I should see the error message "Le format de l\'email est incorrect"', null, { page }); 
  });

  test('Successful login with valid user', async ({ Given, loginPo, When, Then, dashboardPo }) => { 
    await Given('I am on the login page', null, { loginPo }); 
    await When('I login with user "TOTO"', null, { loginPo }); 
    await Then('I should be redirected to the dashboard page', null, { dashboardPo }); 
  });

  test('Navigate to login page', async ({ When, page, Then, loginPo }) => { 
    await When('I go to "login" page', null, { page }); 
    await Then('the login page should be displayed', null, { loginPo }); 
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use('features\\login.feature'),
  $bddFileData: ({}, use) => use(bddFileData),
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am on the login page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then the login page should be displayed","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"And I should see the header and login form","stepMatchArguments":[]}]},
  {"pwTestLine":12,"pickleLine":11,"tags":[],"steps":[{"pwStepLine":13,"gherkinStepLine":12,"keywordType":"Context","textWithKeyword":"Given I am on the login page","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"When I login with wrong credentials \"wrongLogin\" and \"wrongPassword\"","stepMatchArguments":[{"group":{"start":31,"value":"\"wrongLogin\"","children":[{"start":32,"value":"wrongLogin","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":48,"value":"\"wrongPassword\"","children":[{"start":49,"value":"wrongPassword","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":15,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then I should see the error message \"Le format de l'email est incorrect\"","stepMatchArguments":[{"group":{"start":31,"value":"\"Le format de l'email est incorrect\"","children":[{"start":32,"value":"Le format de l'email est incorrect","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":18,"pickleLine":16,"tags":[],"steps":[{"pwStepLine":19,"gherkinStepLine":17,"keywordType":"Context","textWithKeyword":"Given I am on the login page","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When I login with user \"TOTO\"","stepMatchArguments":[{"group":{"start":18,"value":"\"TOTO\"","children":[{"start":19,"value":"TOTO","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":21,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to the dashboard page","stepMatchArguments":[]}]},
  {"pwTestLine":24,"pickleLine":21,"tags":[],"steps":[{"pwStepLine":25,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"When I go to \"login\" page","stepMatchArguments":[{"group":{"start":8,"value":"\"login\"","children":[{"start":9,"value":"login","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":26,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"Then the login page should be displayed","stepMatchArguments":[]}]},
]; // bdd-data-end