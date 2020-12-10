Feature: As an administrator I want to be able to add a prerequisite
    Scenario: Create prerequisite successfully
        Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
        Then I click on "COMP2406" "link" button in the "course" list
        Then I should be on the "administrator/a11cd32c-900a-42fe-bd86-b3f554aeebcc" page
        Then I set the model prerequisite course name to "COMP1104"
        When I create the model
        Then I am notified about a "success" with message "Successful Creation!"
        Then "COMP1104" should be displayed in the "prerequisite" list

    Scenario: Invalid path A: Input contains empty fields
        Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
        Then I click on "COMP2406" "link" button in the "course" list
        Then I should be on the "administrator/a11cd32c-900a-42fe-bd86-b3f554aeebcc" page
        When I create the model
        Then I am notified about a "error" with message "Unsuccessful Creation!"
        Then "COMP1104" should NOT be displayed in the "course" list