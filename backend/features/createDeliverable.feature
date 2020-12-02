Feature: As an professor I want to be able to create a deliverable
Scenario: Successful Creation
    Given I am logged in as "joslo@gmail.com" with password "supersecret" and role "professor"
    Then I click on "COMP4004" "link" button in the "course" list
    Then I set the model name to "TESTDELIVERABLE"
    Then I set the model weight to 10
    Then I set the model due date to "Friday at Noon"
    When I create the model
    Then I am notified about a "success" with message "Successful Creation!"
    Then "TESTDELIVERABLE" should be displayed in the "deliverable" list

Scenario: Unsuccessful Creation
    Given I am logged in as "joslo@gmail.com" with password "supersecret" and role "professor"
    Then I click on "COMP4004" "link" button in the "course" list
    Then I set the model weight to 10
    Then I set the model due date to "Friday at Noon"
    When I create the model
    Then I am notified about a "error" with message "Unsuccessful Creation!"
    Then "TESTDELIVERABLE" should NOT be displayed in the "deliverable" list