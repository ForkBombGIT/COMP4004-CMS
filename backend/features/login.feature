Feature: As a user I want to be able to login
Scenario: Successful Login
    Given I am on the login page
    Then I enter "joslo@gmail.com" in the email field
    Then I enter "supersecret" in the password field
    When I click the "login-button" button
    Then I am notified about a "success" with message "Successful Login!"
    Then I should be on the "professor" page
    
Scenario: Invalid Path A: Incorrect credentials
    Given I am on the login page
    Then I enter "joslo@gmail.com" in the email field
    Then I enter "incorrectpassword" in the password field
    When I click the "login-button" button
    Then I am notified about a "error" with message "Unsuccessful Login!"
    Then I should NOT be on the "professor" page