Feature: As an administrator I want to be able to delete a administrator
Scenario: Delete admin successfully
    Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
    Then I click on "Calvin Cordozar Broadus Jr." "delete" button in the "administrator" list
    Then I am notified about a "success" with message "Successful Deletion!"
    Then "Calvin Cordozar Broadus Jr." should NOT be displayed in the "administrator" list