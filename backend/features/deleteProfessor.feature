Feature: As an administrator I want to be able to delete a professor
Scenario: Successful Deletion
    Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
    Given A "professor" is created with the name "TESTPROF" and email "TESTPROF@gmail.com"
    Then I click on "TESTPROF" "delete" button in the "professor" list
    Then "TESTPROF" should NOT be displayed in the "professor" list
