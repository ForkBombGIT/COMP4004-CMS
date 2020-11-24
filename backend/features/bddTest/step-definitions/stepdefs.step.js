module.exports = function () {
    this.Given(/^I am on the login page$/, function (callback) {
        helpers.loadPage('http://localhost:3000/');
        callback();
    });
    this.Then(/^I am notified about a "([^"]*)" with message "([^"]*)"$/, function (status, message, callback) {
        let messageFound = false;
        driver
          .wait(until.elementLocated(by.className(`Toastify__toast--${status}`)))
          .then(() => {
              driver.findElements(by.className(`Toastify__toast--${status}`)).then((elements) => {
                  elements.forEach((element) => {
                      element.getText().then((text)=>{
                          if (text === message) {
                              messageFound = true;
                          }
                      })
                  })
              })
          }).then(() => {
            if (messageFound) {
                callback();
            }
          })
    });
    this.Given(/^I am logged in as "([^"]*)" with password "([^"]*)" and role "([^"]*)"$/, function (email,password,role,callback) {
        helpers.loadPage('http://localhost:3000/');
        driver.findElement(by.name("email")).sendKeys(email);
        driver.findElement(by.name("password")).sendKeys(password);
        driver.findElement(by.name("login-button")).click();
        driver
          .wait(until.elementLocated(by.className(`Toastify__toast--success`)))
          .then(() => {
              driver.getCurrentUrl().then((url) => {
                expect(url).to.include(role);
                callback();
              });
          })
    });
};