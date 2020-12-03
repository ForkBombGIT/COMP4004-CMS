
module.exports = function () {
    this.When(/^I click the submit button on "([^"]*)"$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        driver.findElement(by.xpath(
            `//span[contains(text(),'${arg1}')]/../../following-sibling::button`
        )).then((webelement) => {
            helpers.scrollToElement(webelement);
            webelement.click();
            callback()
        })
    });

    this.Then(/^I set the submission text on "([^"]*)" to "([^"]*)"$/, function (arg1, arg2, callback) {
        // Write code here that turns the phrase above into concrete actions`
        driver.findElement(by.xpath(
            `//span[contains(text(),'${arg1}')]/../../following-sibling::div//textarea[@class='deliverable-text-area']`
        )).then((webelement) => {
            helpers.scrollToElement(webelement);
            webelement.click();
            webelement.sendKeys(arg2);
            callback()
        })
    });

    this.Then(/^I set the submission text on "([^"]*)" to empty$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions`
        driver.findElement(by.xpath(
            `//span[contains(text(),'${arg1}')]/../../following-sibling::div//textarea[@class='deliverable-text-area']`
        )).then((webelement) => {
            helpers.scrollToElement(webelement);
            webelement.sendKeys(selenium.Key.CONTROL + "a");
            webelement.sendKeys(selenium.Key.DELETE);
            callback()
        })
    });
}