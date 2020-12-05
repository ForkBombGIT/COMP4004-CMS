Feature: As an administrator I want to be able to delete a course
Scenario: Delete course successfully
    Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
    Then I click on "BUSI3119" "delete" button in the "course" list
    Then I am notified about a "success" with message "Successful Deletion!"
    Then "BUSI3119" should NOT be displayed in the "course" list