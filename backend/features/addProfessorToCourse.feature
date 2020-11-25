Feature: As an administrator I want to be able to add a professor from a course
  Scenario: Add professor to course successfully
    Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
    Then I click on "COMP3004" "link" button in the "course" list
    Then I should be on the "administrator/e21cd32c-900a-42fe-bd86-b3f554aeebcc" page
    Then I click on "Joslo Fredrickson" "add" button in the "professor" list
    Then I am notified about a "success" with message "Success, professor added!"