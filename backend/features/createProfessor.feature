Feature: As an administrator I want to be able to create a professor
    Scenario: Create professor successfully
        Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
        Then I click the model select and choose "professor"
        Then I set the model name to "TESTPROF"
        Then I set the model email to "TESTPROF@TESTEMAIL.COM"
        When I create the model
        Then I am notified about a "success" with message "Successful Creation!"
        Then "TESTPROF" should be displayed in the "professor" list

    Scenario: Invalid path A: Input contains empty fields
        Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
        Then I click the model select and choose "professor"
        Then I set the model email to "TESTPROF@TESTEMAIL.COM"
        When I create the model
        Then I am notified about a "error" with message "Unsuccessful Creation!"
        Then "TESTPROF" should NOT be displayed in the "professor" list

    Scenario: Invalid path B: Invalid fields for professor