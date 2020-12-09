Feature: As an administrator I want to be able to make a user a student from their application
Scenario: Successful Student Creation
    Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
    Then I click on "Antwan Andre Patton" "add" button in the "application" list
    Then "Antwan Andre Patton" should be displayed in the "student" list
    Then "Antwan Andre Patton" should NOT be displayed in the "application" list