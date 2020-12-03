module.exports = function () {
    this.Then(/^I should see courses I am assigned to$/, function (callback) {
        driver.findElements(by.className("MuiListItem-container")).then((elements)=>{
            expect(elements.length).to.gte(1);
            callback();
        })
      });

    this.Then(/^I should see courses I am registered in$/, function (callback) {
        driver.findElements(by.id("registered-course-list")).then((elements)=>{
            expect(elements.length).to.gte(1);
            callback();
        })
      });

    this.Then(/^I should see deliverables my course has$/, function (callback) {
        driver.findElements(by.id("deliverable-list")).then((elements)=>{
            expect(elements.length).to.gte(1);
            callback();
        })
      });
}