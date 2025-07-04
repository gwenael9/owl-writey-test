Feature: Login page
  As a user
  I want to be able to login to the application
  So that I can access my dashboard

  Scenario: Display login page
    Given I am on the login page
    Then the login page should be displayed
    And I should see the header and login form

  Scenario: Login attempt with wrong credentials
    Given I am on the login page
    When I login with wrong credentials "wrongLogin" and "wrongPassword"
    Then I should see the error message "Le format de l'email est incorrect"

  Scenario: Successful login with valid user
    Given I am on the login page
    When I login with user "TOTO"
    Then I should be redirected to the dashboard page

  Scenario: Navigate to login page
    When I go to "login" page
    Then the login page should be displayed 