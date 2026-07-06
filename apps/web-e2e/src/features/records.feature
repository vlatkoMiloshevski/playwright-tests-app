Feature: Records table and details page
  As a user
  I want to open a record from the landing table
  So that I can see details for the selected ID

  Scenario: Table is displayed on landing page
    Given I open the records landing page
    Then I should see the records table

  Scenario: Open details page for a specific record ID
    Given I open the records landing page
    When I click the record row with id 102
    Then I should be navigated to the details page for id 102
    And I should see selected record id 102 in the details view

  Scenario: Open details page for an invalid record ID
    When I open details page for invalid record id 999
    Then I should see record not found page
