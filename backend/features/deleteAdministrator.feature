Feature: As an administrator I want to be able to delete a student
Scenario: Successful Deletion
    Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
    Given A "administrator" is created with the name "TESTADM" and email "TESTADM@gmail.com"
    Then I click on "TESTADM" "delete" button in the "administrator" list