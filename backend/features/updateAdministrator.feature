Feature: As an administrator I want to be able to update a administrator
Scenario: Successful Update
    Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
    Given A "administrator" is created with the name "TESTADM" and email "TESTADM@gmail.com"
    Then I am notified about a "success" with message "Successful Creation!"
    Then I click on "TESTADM" "edit" button in the "administrator" list
    Then I update the model "modal-name" to "UPDATED_TESTADM"
    When I update the model
    Then I am notified about a "success" with message "Successful Update!"
    Then "UPDATED_TESTADM" should be displayed in the "administrator" list
