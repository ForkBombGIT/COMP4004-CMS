Feature: As an administrator I want to be able to update a professor
Scenario: Successful Update
    Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
    Given A "professor" is created with the name "TESTPROF" and email "TESTPROF@gmail.com"
    Then I am notified about a "success" with message "Successful Creation!"
    Then I click on "TESTPROF" "edit" button in the "professor" list
    Then I update the model "modal-name" to "UPDATED_TESTPROF"
    When I update the model
    Then I am notified about a "success" with message "Successful Update!"
    Then "UPDATED_TESTPROF" should be displayed in the "professor" list