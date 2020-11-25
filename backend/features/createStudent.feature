Feature: As an administrator I want to be able to create a student
Scenario: Successful Creation
    Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
    Then I click the model select and choose "student"
    Then I set the model name to "TESTSTU"
    Then I set the model email to "TESTSTU@TESTEMAIL.COM"
    When I set the model birth to "01-01-1998"
    When I create the model
    Then I am notified about a "success" with message "Successful Creation!"
    Then "TESTSTU" should be displayed in the "student" list

Scenario: Unsuccessful Creation
    Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
    Then I click the model select and choose "student"
    Then I set the model email to "TESTSTU@TESTEMAIL.COM"
    When I create the model
    Then I am notified about a "error" with message "Unsuccessful Creation!"
    Then "TESTSTU" should NOT be displayed in the "student" list