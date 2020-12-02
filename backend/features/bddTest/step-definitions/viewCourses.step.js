module.exports = function () {
    this.Then(/^I should see courses I am assigned to$/, function (callback) {
        driver.findElements(by.className("MuiListItem-container")).then((elements)=>{
            expect(elements.length).to.equal(1);
            callback();
        })
      });
}