Feature: As a user I want to be able to login
Scenario: Successful Login
    Given I am on the login page
    Then I enter "test@gmail.com" in the email field
    Then I enter "supersecret" in the password field
    When I click the "login-button" button
    Then I am notified of "successful" login