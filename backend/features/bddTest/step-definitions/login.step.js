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
  this.Then(/^I am notified about a "([^"]*)"$/, function (status, callback) {
    driver
      .wait(until.elementLocated(by.className(`Toastify__toast--${status}`)))
      .then(() => {
          callback();
      })
  });
  this.Then(/^I should be on the "([^"]*)" page$/, function (path, callback) {
    driver.getCurrentUrl().then((url) => {
      expect(url).to.include(path);
      callback();
    });
  });
  this.Then(/^I should NOT be on the "([^"]*)" page$/, function (path, callback) {
    driver.getCurrentUrl().then((url) => {
      expect(url).to.not.include(path);
      callback();
    });
  });
};
