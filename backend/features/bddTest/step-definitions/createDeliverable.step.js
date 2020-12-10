module.exports = function () {
    this.Then(/^I set the model weight to (\d+)$/, function (w, callback) {
        driver.findElement(by.id("create-deliverable-weight")).sendKeys(w);
        callback()
    });
    this.Then(/^I set the model due date to "([^"]*)"$/, function (dd, callback) {
        driver.findElement(by.id("create-deliverable-due-date")).sendKeys(dd);
        callback()
    });
}