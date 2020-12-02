module.exports = function () {
    this.Then(/^I set the model weight to (\d+)$/, function (w, callback) {
        driver.findElement(by.name("weight")).sendKeys(w);
        callback()
    });
    this.Then(/^I set the model due date to "([^"]*)"$/, function (dd, callback) {
        driver.findElement(by.name("due")).sendKeys(dd);
        callback()
    });
}