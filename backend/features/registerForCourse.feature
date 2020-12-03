Feature: As a student I want to be able to register for a course
Scenario: successful registration
    Given I am logged in as "josh@gmail.com" with password "supersecret" and role "student"
    Then I click on "JAPA2004" "register" button in the "course" list
    When The system validates input
    Then I am notified about a "success" with message "Success, student added!"

Scenario: Invalid path A: registering for course after dealine
    Given I am logged in as "josh@gmail.com" with password "supersecret" and role "student"
    Then I click on "BIOL3004" "register" button in the "course" list
    When The system validates input
    Then I am notified about a "error" with message "Failure, past registration date!"

Scenario: Invalid path B: registering for course without required prereq's 
    Given I am logged in as "josh@gmail.com" with password "supersecret" and role "student"
    Then I click on "JAPA4004" "register" button in the "course" list
    When The system validates input
    Then I am notified about a "error" with message "Failure, prerequisite not completed!"

Scenario: Invalid path C: registering for course that is already full 
    Given I am logged in as "josh@gmail.com" with password "supersecret" and role "student"
    Then I click on "COMP2004" "register" button in the "course" list
    When The system validates input
    Then I am notified about a "error" with message "Failure, class already full!"