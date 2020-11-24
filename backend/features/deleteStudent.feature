Feature: As an administrator I want to be able to delete a student
Scenario: Successful Deletion
    Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
    Given A student is created with the name "TESTUSER" and email "meredith@gmail.com" and birthday "1998-12-09"
    Then I click on "TESTUSER" delete button in the "student" list