Feature: As an administrator I want to be able to delete a professor
Scenario: Delete professor successfully
    Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
    Then I click on "Feta Porta" "delete" button in the "professor" list
    Then I am notified about a "success" with message "Successful Deletion!"
    Then "Feta Porta" should NOT be displayed in the "professor" list
