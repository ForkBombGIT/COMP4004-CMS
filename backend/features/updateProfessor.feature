Feature: As an administrator I want to be able to update a professor
    Scenario: Update professor successfully
        Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
        Then I click on "Jermaine Cole" "edit" button in the "professor" list
        Then I update the model "update-name" to "Andre Benjamin"
        When I update the model
        Then I am notified about a "success" with message "Successful Update!"
        Then "Andre Benjamin" should be displayed in the "professor" list

    Scenario: Invalid path A: Input contains empty fields
        Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
        Then I click on "Joslo Fredrickson" "edit" button in the "professor" list
        Then I update the model "update-name" to ""
        When I update the model
        Then I am notified about a "error" with message "Unsuccessful Update!"
        Then "Joslo Fredrickson" should be displayed in the "professor" list

    Scenario: Invalid path B: Invalid fields for professor