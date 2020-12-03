Feature: As a student I want to be able to see my courses deliverables
Scenario: Successful view course deliverables
    Given I am logged in as "josh@gmail.com" with password "supersecret" and role "student"
    Then I click on "COMP3004" "link" button in the "registered-course" list
    Then I should be on the "student/e21cd32c-900a-42fe-bd86-b3f554aeebcc" page
    Then I should see deliverables my course has