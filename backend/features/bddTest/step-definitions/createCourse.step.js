module.exports = function () {
    this.Then(/^I set the course capacity to (\d+)$/, function (c, callback) {
        driver.findElement(by.id("course-capacity")).sendKeys(selenium.Key.CONTROL + "a");
        driver.findElement(by.id("course-capacity")).sendKeys(c);
        callback()
    });

    this.Then(/^I set the course time to "([^"]*)"$/, function (t,callback) {
        driver.findElement(by.name("time")).sendKeys(selenium.Key.CONTROL + "a");
        driver.findElement(by.name("time")).sendKeys(t);
        callback()
    });

    this.Then(/^I set the course registration date to "([^"]*)"$/, function (d, callback) {
        driver.findElement(by.id("course-registration-date")).sendKeys(selenium.Key.CONTROL + "a");
        driver.findElement(by.id("course-registration-date")).sendKeys(d);
        callback()
    });

    this.Then(/I set the course withdraw date to "([^"]*)"$/, function (d, callback) {
        driver.findElement(by.id("course-withdraw-date")).sendKeys(selenium.Key.CONTROL + "a");
        driver.findElement(by.id("course-withdraw-date")).sendKeys(d);
        callback()
    });

}