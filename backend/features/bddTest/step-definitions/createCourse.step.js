module.exports = function () {
    this.Then(/^I set the course capacity to (\d+)$/, function (c, callback) {
        driver.findElement(by.id("create-capacity")).sendKeys(selenium.Key.CONTROL + "a");
        driver.findElement(by.id("create-capacity")).sendKeys(c);
        callback()
    });

    this.Then(/^I set the course time to "([^"]*)"$/, function (t,callback) {
        driver.findElement(by.id("create-time")).sendKeys(selenium.Key.CONTROL + "a");
        driver.findElement(by.id("create-time")).sendKeys(t);
        callback()
    });

    this.Then(/^I set the course registration date to "([^"]*)"$/, function (d, callback) {
        driver.findElement(by.id("create-course-registration-date")).sendKeys(selenium.Key.CONTROL + "a");
        driver.findElement(by.id("create-course-registration-date")).sendKeys(d);
        callback()
    });

    this.Then(/I set the course withdraw date to "([^"]*)"$/, function (d, callback) {
        driver.findElement(by.id("create-course-withdraw-date")).sendKeys(selenium.Key.CONTROL + "a");
        driver.findElement(by.id("create-course-withdraw-date")).sendKeys(d);
        callback()
    });

}