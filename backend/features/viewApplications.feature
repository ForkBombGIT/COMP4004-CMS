Feature: As an administrator I want to be able to read student applications
Scenario: Successful Application View
    Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
    Then I should see applications