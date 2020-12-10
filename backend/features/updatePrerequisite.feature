Feature: As an administrator I want to be able to update a prerequisite
    Scenario: Update prerequisite successfully
        Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
        Then I click on "JAPA2004" "link" button in the "course" list
        Then I should be on the "administrator/6050a53e-2b0b-45e6-b581-795ead3837b1" page
        Then I click on "JAPA1004" "edit" button in the "prerequisite" list
        Then I update the model prerequisite course name to "FREN1000"
        When I update the model
        Then I am notified about a "success" with message "Successful Update!"
        Then "FREN1000" should be displayed in the "prerequisite" list

    Scenario: Invalid path A: Input contains empty fields
        Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
        Then I click on "COMP4004" "link" button in the "course" list
        Then I should be on the "administrator/63b804de-c0fd-47c2-a391-5d14999c27a1" page
        Then I click on "COMP1105" "edit" button in the "prerequisite" list
        Then I update the model "update-name" to ""
        When I update the model
        Then I am notified about a "error" with message "Unsuccessful Update!"
        Then "COMP1105" should be displayed in the "prerequisite" list

    Scenario: Invalid path B: Invalid fields for prerequisite
        Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
        Then I click on "COMP4004" "link" button in the "course" list
        Then I should be on the "administrator/63b804de-c0fd-47c2-a391-5d14999c27a1" page
        Then I click on "COMP1105" "edit" button in the "prerequisite" list
        Then I update the model prerequisite course name to "COMP1104"
        When I update the model
        Then I am notified about a "error" with message "Unsuccessful Update!"
        Then "COMP1105" should be displayed in the "prerequisite" list