Feature: As a student I want to be able to see my courses
Scenario: Successful view courses
    Given I am logged in as "josh@gmail.com" with password "supersecret" and role "student"
    Then I should see courses I am registered in
    