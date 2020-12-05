Feature: As a professor I want to be able to view the students in my coursess
Scenario: Successfuly view students in course
    Given I am logged in as "joslo@gmail.com" with password "supersecret" and role "professor"
    Then I click on "FREN1000" "link" button in the "course" list
    Then I should be on the "professor/6c01cec4-7247-471c-bf6a-90a5dcf1dc86" page
    Then I should see students in my course