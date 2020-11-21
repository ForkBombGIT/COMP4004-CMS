module.exports = function () {
  this.Then(
    /^I enter "([^"]*)" in the email field$/,
    function (email, callback) {
      driver.findElement(by.name("email")).sendKeys(email);
      callback();
    }
  );
  this.Then(
    /^I enter "([^"]*)" in the password field$/,
    function (password, callback) {
      driver.findElement(by.name("password")).sendKeys(password);
      callback();
    }
  );
  this.When(/^I click the "([^"]*)" button$/, function (name, callback) {
    driver.findElement(by.name(name)).click();
    driver.sleep(1000).then(() => {
      callback();
    });
  });
  this.Then(/^I am notified of successful login$/, function (callback) {
    driver
      .wait(until.elementLocated(by.className("Toastify__toast-body")))
      .then(() => {
          //expect(driver.findElement(by.className("Toastify__toast-body")).getText()).to.equal("Successful Login!");
          callback();
      })
  });
};
