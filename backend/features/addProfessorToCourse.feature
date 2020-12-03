Feature: As an administrator I want to be able to add a professor from a course
Scenario: Add professor to course successfully
  Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
  Then I click on "COMP3004" "link" button in the "course" list
  Then I should be on the "administrator/e21cd32c-900a-42fe-bd86-b3f554aeebcc" page
  Then I click on "Joslo Fredrickson" "add" button in the "professor" list
  When The system validates input
  Then I am notified about a "success" with message "Success, professor added!"

Scenario: Invalid path A: professor is already registered to course
  Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
  Then I click on "JAPA1004" "link" button in the "course" list
  Then I should be on the "administrator/8ea5d497-e0a4-4f7d-9dc4-624f73f30e51" page
  Then I click on "Gull Johnson" "add" button in the "professor" list
  When The system validates input
  Then I am notified about a "error" with message "Failure, Another Professor is already registered for this course!"