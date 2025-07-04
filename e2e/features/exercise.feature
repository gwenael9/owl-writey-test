Feature: Exercise page

  Scenario: Display exercise page
    Given I am logged in
    When I click on create exercise button
    Then I should see the create exercise title

  Scenario: Créer un nouvel exercice
    Given I am logged in
    When I click on create exercise button
    And I fill the exercise title with "Exercice de test 1"
    And I fill the exercise history with "Contenu de l'exercice"
    And I click on "Créer"
    Then I should see the exercise "Exercice de test 1" in the list
    Then I delete the exercise "Exercice de test 1"

  Scenario: Ajouter un tour à mon exercice
    Given I am logged in
    And I have created an exercise titled "Exercice de test 2"
    When I select the exercise "Exercice de test 2"
    And I add a turn with comment "mon nouveau commentaire"
    Then I should see "mon nouveau commentaire" in the exercise details
    Then I delete the exercise "Exercice de test 2"


