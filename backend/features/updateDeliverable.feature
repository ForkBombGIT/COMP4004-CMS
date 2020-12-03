Feature: As a professor I want to be able to update a deliverable
Scenario: Successful Update
    Given I am logged in as "joslo@gmail.com" with password "supersecret" and role "professor"
    Then I click on "COMP2406" "link" button in the "course" list
    Given A deliverable is created with the name "TESTDELIVERABLE" and weight 10 and due on "Friday at 10AM"
    Then I am notified about a "success" with message "Successful Creation!"
    Then I click on "TESTDELIVERABLE" "edit" button in the "deliverable" list
    Then I update the model "modal-name" to "UPDATED_TESTDELIVERABLE"
    Then I update the model "modal-due" to "Tuesday at 4pm"
    When I update the model
    Then I am notified about a "success" with message "Successful Update!"
    Then "UPDATED_TESTDELIVERABLE" should be displayed in the "deliverable" list

Scenario: Unsuccessful Update
    Given I am logged in as "joslo@gmail.com" with password "supersecret" and role "professor"
    Then I click on "COMP2406" "link" button in the "course" list
    Given A deliverable is created with the name "TESTDELIVERABLE" and weight 10 and due on "Friday at 10AM"
    Then I am notified about a "success" with message "Successful Creation!"
    Then I click on "TESTDELIVERABLE" "edit" button in the "deliverable" list
    Then I update the model "modal-name" to ""
    When I update the model
    Then I am notified about a "error" with message "Unsuccessful Update!"
    Then "TESTDELIVERABLE" should be displayed in the "deliverable" list