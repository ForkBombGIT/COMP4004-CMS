module.exports = function () {
    this.Then(/^I should see applications$/, function (callback) {
        driver.findElement(by.id("application-list")).then((element)=>{
            element.findElements(by.className("MuiListItem-container")).then((elements)=>{
                expect(elements).to.exist;
                callback();
            })
        })
    });
}