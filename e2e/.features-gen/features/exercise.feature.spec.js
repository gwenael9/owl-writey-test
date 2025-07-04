// Generated from: features\exercise.feature
import { fixtures as test } from "../../steps/common.steps.ts";

test.describe('Exercise page', () => {

  test('Display exercise page', async ({ Given, loginPo, dashboardPo, When, exercisePo, Then }) => { 
    await Given('I am logged in', null, { loginPo, dashboardPo }); 
    await When('I click on create exercise button', null, { exercisePo }); 
    await Then('I should see the create exercise title', null, { exercisePo }); 
  });

  test('Créer un nouvel exercice', async ({ Given, loginPo, dashboardPo, When, exercisePo, And, Then }) => { 
    await Given('I am logged in', null, { loginPo, dashboardPo }); 
    await When('I click on create exercise button', null, { exercisePo }); 
    await And('I fill the exercise title with "Exercice de test 1"', null, { exercisePo }); 
    await And('I fill the exercise history with "Contenu de l\'exercice"', null, { exercisePo }); 
    await And('I click on "Créer"', null, { exercisePo }); 
    await Then('I should see the exercise "Exercice de test 1" in the list', null, { exercisePo }); 
    await Then('I delete the exercise "Exercice de test 1"', null, { exercisePo, dashboardPo }); 
  });

  test('Ajouter un tour à mon exercice', async ({ Given, loginPo, dashboardPo, And, exercisePo, When, Then }) => { 
    await Given('I am logged in', null, { loginPo, dashboardPo }); 
    await And('I have created an exercise titled "Exercice de test 2"', null, { exercisePo }); 
    await When('I select the exercise "Exercice de test 2"', null, { exercisePo }); 
    await And('I add a turn with comment "mon nouveau commentaire"', null, { exercisePo }); 
    await Then('I should see "mon nouveau commentaire" in the exercise details', null, { exercisePo }); 
    await Then('I delete the exercise "Exercice de test 2"', null, { exercisePo, dashboardPo }); 
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
  {"pwTestLine":12,"pickleLine":8,"tags":[],"steps":[{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"Given I am logged in","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When I click on create exercise button","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"And I fill the exercise title with \"Exercice de test 1\"","stepMatchArguments":[{"group":{"start":31,"value":"\"Exercice de test 1\"","children":[{"start":32,"value":"Exercice de test 1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":16,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"And I fill the exercise history with \"Contenu de l'exercice\"","stepMatchArguments":[{"group":{"start":33,"value":"\"Contenu de l'exercice\"","children":[{"start":34,"value":"Contenu de l'exercice","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":17,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"And I click on \"Créer\"","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then I should see the exercise \"Exercice de test 1\" in the list","stepMatchArguments":[{"group":{"start":26,"value":"\"Exercice de test 1\"","children":[{"start":27,"value":"Exercice de test 1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then I delete the exercise \"Exercice de test 1\"","stepMatchArguments":[{"group":{"start":22,"value":"\"Exercice de test 1\"","children":[{"start":23,"value":"Exercice de test 1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":22,"pickleLine":17,"tags":[],"steps":[{"pwStepLine":23,"gherkinStepLine":18,"keywordType":"Context","textWithKeyword":"Given I am logged in","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":19,"keywordType":"Context","textWithKeyword":"And I have created an exercise titled \"Exercice de test 2\"","stepMatchArguments":[{"group":{"start":34,"value":"\"Exercice de test 2\"","children":[{"start":35,"value":"Exercice de test 2","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":25,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"When I select the exercise \"Exercice de test 2\"","stepMatchArguments":[{"group":{"start":22,"value":"\"Exercice de test 2\"","children":[{"start":23,"value":"Exercice de test 2","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":26,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"And I add a turn with comment \"mon nouveau commentaire\"","stepMatchArguments":[{"group":{"start":26,"value":"\"mon nouveau commentaire\"","children":[{"start":27,"value":"mon nouveau commentaire","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":27,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Then I should see \"mon nouveau commentaire\" in the exercise details","stepMatchArguments":[{"group":{"start":13,"value":"\"mon nouveau commentaire\"","children":[{"start":14,"value":"mon nouveau commentaire","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":28,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"Then I delete the exercise \"Exercice de test 2\"","stepMatchArguments":[{"group":{"start":22,"value":"\"Exercice de test 2\"","children":[{"start":23,"value":"Exercice de test 2","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end