Feature: As an administrator I want to be able to update a administrator
    Scenario: Successful administrator Update
        Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
        Then I click on "Andre Romelle Young" "edit" button in the "administrator" list
        Then I update the model "update-name" to "Shawn Corey Carter"
        When I update the model
        Then I am notified about a "success" with message "Successful Update!"
        Then "Shawn Corey Carter" should be displayed in the "administrator" list

    Scenario: Invalid path A: Input contains empty fields
        Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
        Then I click on "Jelog Yugislav" "edit" button in the "administrator" list
        Then I update the model "update-name" to ""
        When I update the model
        Then I am notified about a "error" with message "Unsuccessful Update!"
        Then "Jelog Yugislav" should be displayed in the "administrator" list

    Scenario: Invalid path B: Invalid fields for administrator
