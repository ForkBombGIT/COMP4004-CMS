
module.exports = function () {
    this.Then(/^I change the course grade to "([^"]*)"$/, function (keys, callback) {
        driver.sleep(500).then(() => {
            driver.findElement(by.xpath(
                `//div[@class='course-grade-submission']//div//input`
            )).then((elem) => {
                elem.sendKeys(selenium.Key.CONTROL + "a");
                elem.sendKeys(selenium.Key.DELETE);
                elem.sendKeys(keys);
                callback();
            })
        })
    });

    this.Then(/^I change the grade field under "([^"]*)" to "([^"]*)"$/, function (a, keys, callback) {
        driver.sleep(500).then(() => {
            driver.findElement(by.xpath(
                `//*[contains(text(),'${a}')]/../../following-sibling::div[@class='grade-submission']//div//input`
            )).then((elem) => {
                elem.sendKeys(selenium.Key.CONTROL + "a");
                elem.sendKeys(selenium.Key.DELETE);
                elem.sendKeys(keys);
                callback();
            })
        })
    });

    this.Then(/^I click the submit button by course grade$/, function (callback) {
        driver.sleep(500).then(() => {
            driver.findElement(by.xpath(
                `//div[@class='course-grade-submission']//button`
            )).then((elem) => {
                elem.click();
                driver.sleep(500).then(() => {
                    callback();
                });
            })
        })
    });

    this.Then(/^I click the submit button under deliverable "([^"]*)"$/, function (a, callback) {
        driver.sleep(500).then(() => {
            driver.findElement(by.xpath(
                `//*[contains(text(),'${a}')]/../../following-sibling::div[@class='grade-submission']//button`
            )).then((elem) => {
                elem.click();
                driver.sleep(500).then(() => {
                    callback();
                });
            })
        })
    });
}


    