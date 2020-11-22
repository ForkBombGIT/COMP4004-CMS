module.exports = function () {
    this.Given(/^I am on the login page$/, function (callback) {
        helpers.loadPage('http://localhost:3000/');
        callback();
    });
};