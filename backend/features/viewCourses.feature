Feature: As a professor I want to be able to view my courses
Scenario: Successful Course View
    Given I am logged in as "joslo@gmail.com" with password "supersecret" and role "professor"
    Then I should see courses I am assigned to