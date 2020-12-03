Feature: As a student I want to be able to submit a course deliverable
Scenario: Successful Submission 
    Given I am logged in as "josh@gmail.com" with password "supersecret" and role "student"
    Then I click on "COMP1104" "link" button in the "registered-course" list
    Then I should be on the "student/41b037cb-3e6e-429d-880a-0ecdd54f483" page
    Then I set the submission text on "deliverable assignment 1" to "Hello"
    When I click the submit button on "deliverable assignment 1"
    Then I am notified about a "success" with message "Success, deliverable submitted!"

Scenario: Invalid Path A: Input contains empty fields 
    Given I am logged in as "josh@gmail.com" with password "supersecret" and role "student"
    Then I click on "COMP1104" "link" button in the "registered-course" list
    Then I should be on the "student/41b037cb-3e6e-429d-880a-0ecdd54f483" page
    Then I set the submission text on "deliverable assignment 1" to empty 
    When I click the submit button on "deliverable assignment 1"
    Then I am notified about a "error" with message "Failure, empty fields!"

Scenario: Invalid Path B: Invalid fields for course due date
    Given I am logged in as "josh@gmail.com" with password "supersecret" and role "student"
    Then I click on "COMP1104" "link" button in the "registered-course" list
    Then I should be on the "student/41b037cb-3e6e-429d-880a-0ecdd54f483" page
    Then I set the submission text on "deliverable assignment 2" to "no"
    When I click the submit button on "deliverable assignment 2"
    Then I am notified about a "error" with message "Failure, past due date!"