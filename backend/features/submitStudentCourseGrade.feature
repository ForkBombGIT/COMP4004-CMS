Feature: As a professor I want to be able to submit a students course grade
Scenario: Successfuly submit students course grade
    Given I am logged in as "joslo@gmail.com" with password "supersecret" and role "professor"
    Then I click on "FREN1000" "link" button in the "course" list
    Then I should be on the "professor/6c01cec4-7247-471c-bf6a-90a5dcf1dc86" page
    Then I click on "Josh Gorman" "link" button in the "registered-students" list
    Then I should be on the "professor/6c01cec4-7247-471c-bf6a-90a5dcf1dc86/2108b4e7-daf1-438f-9ad7-7612ef034bd4" page
    Then I change the course grade to "40"
    Then I click the submit button by course grade
    When The system validates input
    Then I am notified about a "success" with message "Success, course grade submitted!"

Scenario: Invalid path A: invalid fields input (grade not number between 1-100)
    Given I am logged in as "joslo@gmail.com" with password "supersecret" and role "professor"
    Then I click on "FREN1000" "link" button in the "course" list
    Then I should be on the "professor/6c01cec4-7247-471c-bf6a-90a5dcf1dc86" page
    Then I click on "Josh Gorman" "link" button in the "registered-students" list
    Then I should be on the "professor/6c01cec4-7247-471c-bf6a-90a5dcf1dc86/2108b4e7-daf1-438f-9ad7-7612ef034bd4" page
    Then I change the course grade to "999"
    Then I click the submit button by course grade
    When The system validates input
    Then I am notified about a "error" with message "Failure, grade must be between 0-100!"