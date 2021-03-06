module.exports = function () {
    this.Then(/^I set the model prerequisite course name to "([^"]*)"$/, function (name, callback) {
        const e = driver.findElement(by.id("create-name"));
        driver.actions().mouseMove(e).click().perform().then(() => {
            driver.sleep(2000).then(() => {
                driver.findElement(by.name(name)).click();
                callback();
            });
        });
      });
}