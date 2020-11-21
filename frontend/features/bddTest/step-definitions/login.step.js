module.exports = function() {
    this.Given(/^I am on the login page$/, function (callback) {
        helpers.loadPage(`http://localhost:3000/`)
        callback();
    });
    this.Then(/^I enter "([^"]*)" in the email field$/, function (email, callback) {
        driver.findElement(by.name('email')).sendKeys(email);
        callback();
    });
    this.Then(/^I enter "([^"]*)" in the password field$/, function (password, callback) {
        driver.findElement(by.name('password')).sendKeys(password);
        callback();
    });
    this.When(/^I click the "([^"]*)" button$/, function (name, callback) {
        driver.findElement(by.name(name)).click();
        callback();
    });
    this.Then(/^I am notified of "([^"]*)" login$/, function (arg1, callback) {
        driver.wait(until.elementsLocated(by.name('snackbar')), 10000).then(function(){
            const snackbar = driver.findElement(by.name('snackbar'));
            console.log(snackbar);
            callback()
        })
    });
}
