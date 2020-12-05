Feature: As an administrator I want to be able to delete a deliverable
Scenario: Successfully delete deliverable
    Given I am logged in as "joslo@gmail.com" with password "supersecret" and role "professor"
    Then I click on "COMP2406" "link" button in the "course" list
    Then I click on "deliverable assignment 2" "delete" button in the "deliverable" list
    Then I am notified about a "success" with message "Successful Deletion!"
    Then "deliverable assignment 2" should NOT be displayed in the "deliverable" list