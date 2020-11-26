Feature: As an administrator I want to be able to update a student
Scenario: Successful Update
    Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
    Given A student is created with the name "TESTSTU" and email "meredith@gmail.com" and birthday "1998-12-09"
    Then I am notified about a "success" with message "Successful Creation!"
    Then I click on "TESTSTU" "edit" button in the "student" list
    Then I update the model "modal-name" to "UPDATED_TESTSTU"
    When I update the model
    Then I am notified about a "success" with message "Successful Update!"
    Then "UPDATED_TESTSTU" should be displayed in the "student" list