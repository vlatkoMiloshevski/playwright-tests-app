// Generated from: src\features\records.feature
import { test } from "playwright-bdd";

test.describe('Records table and details page', () => {

  test('Table is displayed on landing page', async ({ Given, Then, page }) => { 
    await Given('I open the records landing page', null, { page }); 
    await Then('I should see the records table', null, { page }); 
  });

  test('Open details page for a specific record ID', async ({ Given, When, Then, And, page }) => { 
    await Given('I open the records landing page', null, { page }); 
    await When('I click the record row with id 102', null, { page }); 
    await Then('I should be navigated to the details page for id 102', null, { page }); 
    await And('I should see selected record id 102 in the details view', null, { page }); 
  });

  test('Open details page for an invalid record ID', async ({ When, Then, page }) => { 
    await When('I open details page for invalid record id 999', null, { page }); 
    await Then('I should see record not found page', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('src\\features\\records.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I open the records landing page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then I should see the records table","stepMatchArguments":[]}]},
  {"pwTestLine":11,"pickleLine":10,"tags":[],"steps":[{"pwStepLine":12,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given I open the records landing page","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When I click the record row with id 102","stepMatchArguments":[{"group":{"start":31,"value":"102"},"parameterTypeName":"int"}]},{"pwStepLine":14,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then I should be navigated to the details page for id 102","stepMatchArguments":[{"group":{"start":49,"value":"102"},"parameterTypeName":"int"}]},{"pwStepLine":15,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"And I should see selected record id 102 in the details view","stepMatchArguments":[{"group":{"start":32,"value":"102"},"parameterTypeName":"int"}]}]},
  {"pwTestLine":18,"pickleLine":16,"tags":[],"steps":[{"pwStepLine":19,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"When I open details page for invalid record id 999","stepMatchArguments":[{"group":{"start":42,"value":"999"},"parameterTypeName":"int"}]},{"pwStepLine":20,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then I should see record not found page","stepMatchArguments":[]}]},
]; // bdd-data-end