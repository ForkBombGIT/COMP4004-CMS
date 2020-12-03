Feature: As an administrator I want to be able to delete a course
Scenario: Successful Deletion
    Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
    Given A course is created with the name "TESTCOURSE" and capacity 0 and time "Friday at 10AM"
    Then I am notified about a "success" with message "Successful Creation!"
    Then I click on "TESTCOURSE" "delete" button in the "course" list
    Then "TESTCOURSE" should NOT be displayed in the "course" list