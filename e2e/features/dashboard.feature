Feature: Dashboard page

Scenario: Display dashboard page
  Given I am logged in
  When I go to "dashboard" page
  Then I should see the dashboard page displayed