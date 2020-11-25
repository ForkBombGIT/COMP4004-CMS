Feature: As an administrator I want to be able to add a student to a course
  Scenario: Add successfully
    Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
    Then I click on "COMP3004" "link" button in the "course" list
    Then I should be on the "administrator/e21cd32c-900a-42fe-bd86-b3f554aeebcc" page
    Then I click on "Josh Gorman" "add" button in the "student" list
    Then I am notified about a "success" with message "Success, student added!"