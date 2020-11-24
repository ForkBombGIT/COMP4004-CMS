module.exports = function () {
    this.Then(/^I click on "([^"]*)" delete button in the "([^"]*)" list$/, function (n, s, callback) {
        driver.findElement(by.xpath(`//ul[@id='${s}-list']//*[contains(text(),'${n}')]/../../..//button[@name='delete-button']`)).then((e)=>{
            driver.actions().mouseMove(e).click().perform().then(() => {
                driver.sleep(2000).then(() => {
                    driver.findElements(by.xpath(`//ul[@id='${s}-list']//*[contains(text(),'${n}')]/../../..//button[@name='delete-button']`)).then((elements) => {
                        expect(elements.length).to.equal(0);
                        callback();
                    })
                });
            });
        })
    });
}