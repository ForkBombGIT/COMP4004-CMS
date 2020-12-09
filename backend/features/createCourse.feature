Feature: As an administrator I want to be able to create a course
    Scenario: Create course successfully
        Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
        Then I click the model select and choose "course"
        Then I set the model name to "TESTCOURSE"
        Then I set the course capacity to 100
        Then I set the course time to "Friday at 10AM"
        Then I set the course registration date to "2020-01-01"
        Then I set the course withdraw date to "2020-01-01"
        When I create the model
        Then I am notified about a "success" with message "Successful Creation!"
        Then "TESTCOURSE" should be displayed in the "course" list

    Scenario: Invalid path A: Input contains empty fields
        Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
        Then I click the model select and choose "course"
        When I create the model
        Then I am notified about a "error" with message "Unsuccessful Creation!"
        Then "TESTCOURSE" should NOT be displayed in the "course" list

    Scenario: Invalid path B: Invalid fields for course