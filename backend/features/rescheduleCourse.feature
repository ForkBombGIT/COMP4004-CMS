Feature: As an administrator I want to be able to re-schedule a course
    Scenario: Reschedule course successfully
        Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
        Then I click on "COMP2406" "edit" button in the "course" list
        Then I update the course status to "inprogress"
        When I update the model
        Then I am notified about a "success" with message "Successful Update!"
        Then I click on "COMP2406" "edit" button in the "course" list
        Then Element named "status" should be equal to "inprogress"
        Then "COMP2406" should be displayed in the "course" list

    Scenario: Invalid path A: Input contains empty fields
        Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
        Then I click on "COMP2406" "edit" button in the "course" list
        Then I update the model "update-name" to ""
        When I update the model
        Then I am notified about a "error" with message "Unsuccessful Update!"
        Then "COMP2406" should be displayed in the "course" list

    Scenario: Invalid path B: Invalid fields for course