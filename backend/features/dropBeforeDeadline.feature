Feature: As a student I want to be able to drop a course before the academic deadline
Scenario: successful drop with DR
    Given I am logged in as "josh@gmail.com" with password "supersecret" and role "student"
    Then I click on "BIOL1004" "unregister" button in the "registered-course" list
    When The system validates input
    Then I am notified about a "success" with message "Success, dropped with DR!"

Scenario: Invalid path A: dropping an already completed/dropped course
    Given I am logged in as "josh@gmail.com" with password "supersecret" and role "student"
    Then I click on "JAPA1004" "unregister" button in the "registered-course" list
    When The system validates input
    Then I am notified about a "error" with message "Failure, course already complete!"