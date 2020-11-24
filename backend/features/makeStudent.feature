Feature: As an administrator I want to be able to make a user a student from their application
Scenario: Successful Student Creation
    Given An application is created with name "TESTUSER"
    Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
    Then I click on "TESTUSER" "add" button in the "application" list
    Then "TESTUSER" should be displayed in the "student" list
    Then "TESTUSER" should NOT be displayed in the "application" list