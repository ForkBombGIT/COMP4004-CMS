Feature: As an administrator I want to be able to remove a professor from a course:
Scenario: Remove successfully
  Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
  Then I click on "COMP4004" "link" button in the "course" list
  Then I should be on the "administrator/63b804de-c0fd-47c2-a391-5d14999c27a1" page
  Then I click on unregister professor button
  When The system validates input
  Then I am notified about a "success" with message "Success, professor removed!"

Scenario: Invalid path A: no professor is registered to the course 
  Given I am logged in as "jelog@gmail.com" with password "supersecret" and role "administrator"
  Then I click on "JAPA2004" "link" button in the "course" list
  Then I should be on the "administrator/6050a53e-2b0b-45e6-b581-795ead3837b1" page
  Then I click on unregister professor button
  When The system validates input
  Then I am notified about a "error" with message "Failure, no professor is registered in this course!"