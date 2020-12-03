Feature: As an administrator I want to be able to delete a deliverable
Scenario: Successful Deletion
    Given I am logged in as "joslo@gmail.com" with password "supersecret" and role "professor"
    Then I click on "COMP4004" "link" button in the "course" list
    Given A deliverable is created with the name "TESTDELIVERABLE" and weight 10 and due on "Friday at 10AM"
    Then I am notified about a "success" with message "Successful Creation!"
    Then I click on "TESTDELIVERABLE" "delete" button in the "deliverable" list
    Then "TESTDELIVERABLE" should NOT be displayed in the "deliverable" list