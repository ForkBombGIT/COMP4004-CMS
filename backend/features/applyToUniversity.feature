Feature: As a student I want to be able to apply to join the university
  Scenario: Apply sucessfully 
    Given I am on the login page
    Then I enter a name in the student name field
    When I click the register button
    Then the system displays an application has been submitted 