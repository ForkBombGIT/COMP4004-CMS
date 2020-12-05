Feature: As an administrator I want to be able to update a student
    Scenario: Update student successfully
        Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
        Then I click on "Wesley Peckinghem" "edit" button in the "student" list
        Then I update the model "modal-name" to "Wert Peckinghem"
        When I update the model
        Then I am notified about a "success" with message "Successful Update!"
        Then "Wert Peckinghem" should be displayed in the "student" list

    Scenario: Invalid path A: Input contains empty fields
        Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
        Then I click on "Eros Di Pede" "edit" button in the "student" list
        Then I update the model "modal-name" to ""
        When I update the model
        Then I am notified about a "error" with message "Unsuccessful Update!"
        Then "Eros Di Pede" should be displayed in the "student" list

    Scenario: Invalid path B: Invalid fields for student