Feature: As an administrator I want to be able to update a course
Scenario: Successful Update
    Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
    Given A course is created with the name "TESTCOURSE" and capacity 10 and time "Friday at 10AM"
    Then I am notified about a "success" with message "Successful Creation!"
    Then I click on "TESTCOURSE" "edit" button in the "course" list
    Then I update the model "modal-name" to "UPDATED_TESTCOURSE"
    When I update the model
    Then I am notified about a "success" with message "Successful Update!"
    Then "UPDATED_TESTCOURSE" should be displayed in the "course" list

Scenario: Unsuccessful Update
    Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
    Given A course is created with the name "TESTCOURSE" and capacity 10 and time "Friday at 10AM"
    Then I am notified about a "success" with message "Successful Creation!"
    Then I click on "TESTCOURSE" "edit" button in the "course" list
    Then I update the model "modal-name" to ""
    When I update the model
    Then I am notified about a "error" with message "Unsuccessful Update!"
    Then "TESTCOURSE" should be displayed in the "course" list