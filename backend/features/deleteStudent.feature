Feature: As an administrator I want to be able to delete a student
Scenario: Delete student successfully
    Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
    Then I click on "Jarold Patinkin" "delete" button in the "student" list
    Then I am notified about a "success" with message "Successful Deletion!"
    Then "Jarold Patinkin" should NOT be displayed in the "student" list