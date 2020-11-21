module.exports = function () {
  this.Then(/^I enter a name in the student name field$/, function (callback) {
    driver.findElement(By.id('student-name')).sendKeys(
      shared.studentApplication.studentName
    );
    callback();
  });

  this.When(/^I click the register button$/, function (callback) {
    driver.findElement(By.id('register-button')).click();
    driver.sleep(1000).then(() => {
      callback();
    });
  });

  this.Then(/^the system displays an application has been submitted$/, function (callback) {
    driver.wait(until.elementLocated(by.className('Toastify__toast-body'))).then(() => {
      const app = shared.app.api.service('application');
      app.find({
          query: {
            $limit: 1,
            $sort: {
              createdAt: -1
            }
          }
        }
      ).then((record) => {
        console.log(record)
        app.remove(record[0].id);
        callback()
      })
    });
  });
};