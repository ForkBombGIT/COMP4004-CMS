module.exports = function() {
    this.Then(/^I update the course status to "([^"]*)"$/, function (status, callback) {
        const e = driver.findElement(by.id("update-course-status-select"));
        driver.actions().mouseMove(e).click().perform().then(() => {
            driver.sleep(2000).then(() => {
                driver.findElement(by.name(status)).click();
                callback();
            });
        });
    });
}