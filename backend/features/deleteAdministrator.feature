Feature: As an administrator I want to be able to delete a student
Scenario: Successful Deletion
    Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
    Given A "administrator" is created with the name "TESTADM" and email "TESTADM@gmail.com"
    Then I am notified about a "success" with message "Successful Creation!"
    Then I click on "TESTADM" "delete" button in the "administrator" list
    Then "TESTADM" should NOT be displayed in the "administrator" list