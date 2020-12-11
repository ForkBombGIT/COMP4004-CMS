Feature: As an administrator I want to be able to update a course
    Scenario: Update course successfully
        Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
        Then I click on "BUSI2503" "edit" button in the "course" list
        Then I update the model "update-name" to "BUSI2204"
        When I update the model
        Then I am notified about a "success" with message "Successful Update!"
        Then "BUSI2204" should be displayed in the "course" list

    Scenario: Invalid path A: Input contains empty fields
        Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
        Then I click on "COMP2406" "edit" button in the "course" list
        Then I update the model "update-name" to ""
        When I update the model
        Then I am notified about a "error" with message "Unsuccessful Update!"
        Then "COMP2406" should be displayed in the "course" list