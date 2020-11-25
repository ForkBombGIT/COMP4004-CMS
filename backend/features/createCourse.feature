Feature: As an administrator I want to be able to create a course
Scenario: Successful Creation
    Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
    Then I click the model select and choose "course"
    Then I set the model name to "TESTCOURSE"
    Then I set the course capacity to 100
    Then I set the course time to "Friday at 10AM"
    When I create the model
    Then I am notified about a "success" with message "Successful Creation!"
    Then "TESTCOURSE" should be displayed in the "course" list

Scenario: Unsuccessful Creation
    Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
    Then I click the model select and choose "course"
    When I create the model
    Then I am notified about a "error" with message "Unsuccessful Creation!"
    Then "TESTCOURSE" should NOT be displayed in the "course" list