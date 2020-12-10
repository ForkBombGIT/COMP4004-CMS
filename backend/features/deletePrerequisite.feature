Feature: As an administrator I want to be able to delete a prerequisite
    Scenario: Delete prerequisite successfully
        Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
        Then I click on "COMP2406" "link" button in the "course" list
        Then I should be on the "administrator/a11cd32c-900a-42fe-bd86-b3f554aeebcc" page
        Then I click on "COMP1105" "delete" button in the "prerequisite" list
        Then I am notified about a "success" with message "Successful Deletion!"
        Then "COMP1105" should NOT be displayed in the "prerequisite" list