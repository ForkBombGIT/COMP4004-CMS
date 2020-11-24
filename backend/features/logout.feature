Feature: As a user I want to be able to logout
  Scenario: Successful Logout 
    Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
    When I click the "logout-button" button
    Then I am notified about a "success" with message "Logout Successfull!"
    Then I should NOT be on the "professor" page