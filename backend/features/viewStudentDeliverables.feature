Feature: As a professor I want to be able to view a students deliverable
Scenario: Successfuly view students deliverables
    Given I am logged in as "joslo@gmail.com" with password "supersecret" and role "professor"
    Then I click on "FREN1000" "link" button in the "course" list
    Then I should be on the "professor/6c01cec4-7247-471c-bf6a-90a5dcf1dc86" page
    Then I click on "Josh Gorman" "link" button in the "registered-students" list
    Then I should be on the "professor/6c01cec4-7247-471c-bf6a-90a5dcf1dc86/2108b4e7-daf1-438f-9ad7-7612ef034bd4" page
    Then I should see the students deliverables