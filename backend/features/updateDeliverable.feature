Feature: As a professor I want to be able to update a deliverable
    Scenario: Update deliverable successfully
        Given I am logged in as "joslo@gmail.com" with password "supersecret" and role "professor"
        Then I click on "COMP2406" "link" button in the "course" list
        Then I click on "deliverable assignment 4" "edit" button in the "deliverable" list
        Then I update the model "modal-name" to "deliverable assignment 5"
        Then I update the model "modal-due" to "Tuesday at 4pm"
        When I update the model
        Then I am notified about a "success" with message "Successful Update!"
        Then "deliverable assignment 5" should be displayed in the "deliverable" list

    Scenario: Invalid path A: Input contains empty fields
        Given I am logged in as "joslo@gmail.com" with password "supersecret" and role "professor"
        Then I click on "COMP2406" "link" button in the "course" list
        Then I click on "deliverable assignment 1" "edit" button in the "deliverable" list
        Then I update the model "modal-name" to ""
        When I update the model
        Then I am notified about a "error" with message "Unsuccessful Update!"
        Then "deliverable assignment 1" should be displayed in the "deliverable" list

    Scenario: Invalid path B: Invalid fields for deliverable