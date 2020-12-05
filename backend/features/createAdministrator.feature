Feature: As an administrator I want to be able to create an administrator
    Scenario: Create admin successfully
        Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
        Then I click the model select and choose "administrator"
        Then I set the model name to "TESTADM"
        Then I set the model email to "TESTADM@TESTEMAIL.COM"
        When I create the model
        Then I am notified about a "success" with message "Successful Creation!"
        Then "TESTADM" should be displayed in the "administrator" list

    Scenario: Invalid path A: Input contains empty fields
        Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
        Then I click the model select and choose "administrator"
        Then I set the model email to "TESTADM@TESTEMAIL.COM"
        When I create the model
        Then I am notified about a "error" with message "Unsuccessful Creation!"
        Then "TESTADM" should NOT be displayed in the "administrator" list

    Scenario: Invalid path B: Invalid fields for administrator