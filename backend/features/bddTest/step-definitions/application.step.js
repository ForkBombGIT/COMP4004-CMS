module.exports = function () {
  this.Then(/^I enter a name in the student name field$/, function (callback) {
    driver.findElement(By.id('student-name')).sendKeys(
      shared.studentApplication.studentName
    );
    callback();
  });

  this.When(/^I click the register button$/, function (callback) {
    driver.findElement(By.id('register-button')).click();
    driver.sleep(500).then(() => {
      callback();
    });
  });

  this.Then(/^the system creates my application$/, function (callback) {
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
      app.remove(record[0].id);
      callback()
    })
  })
}