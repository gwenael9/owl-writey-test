Feature: Exercise page

  Scenario: Display exercise page
    Given I am logged in
    When I click on create exercise button
    Then I should see the create exercise title

  Scenario: Create new exercise
    Given I am logged in
    When I go to "exercise" page
    Then I should see the create exercise title
