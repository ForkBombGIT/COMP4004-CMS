module.exports = function () {
    this.Given(/^I am on the login page$/, function (callback) {
        helpers.loadPage('http://localhost:3000/');
        callback();
    });
    this.Then(/^I am notified about a "([^"]*)" with message "([^"]*)"$/, function (status, message, callback) {
        driver.wait(until.elementLocated(by.xpath(`//div[contains(@class, 'Toastify__toast--${status}')]//div[contains(text(), '${message}')]`))).then((e) => {
            callback()
        })
    });
    this.Given(/^A "([^"]*)" is created with the name "([^"]*)" and email "([^"]*)"$/, function (s, n, e, callback) {
        driver.findElement(by.className("MuiSelect-selectMenu")).click()
        driver.findElement(by.name(s)).click();
        driver.findElement(by.name("name")).sendKeys(n);
        driver.findElement(by.name("email")).sendKeys(e);
        driver.findElement(by.name("create-button")).click();
        driver.sleep(2000).then(() => {
            callback();
        });
    });
    this.Given(/^A student is created with the name "([^"]*)" and email "([^"]*)" and birthday "([^"]*)"$/, function (n, e, b, callback) {
        driver.findElement(by.className("MuiSelect-selectMenu")).click()
        driver.findElement(by.name("student")).click();
        driver.findElement(by.name("name")).sendKeys(n);
        driver.findElement(by.name("email")).sendKeys(e);
        driver.findElement(by.name("birth")).sendKeys(b);
        driver.findElement(by.name("create-button")).click();
        driver.sleep(2000).then(() => {
            callback();
        });
    });
    this.Given(/^A course is created with the name "([^"]*)" and capacity (\d+) and time "([^"]*)"$/, function (n, c, d, callback) {
        driver.findElement(by.className("MuiSelect-selectMenu")).click()
        driver.findElement(by.name("course")).click();
        driver.findElement(by.name("name")).sendKeys(n);
        driver.findElement(by.id("course-capacity")).sendKeys(selenium.Key.CONTROL + "a");
        driver.findElement(by.id("course-capacity")).sendKeys(c);
        driver.findElement(by.name("time")).sendKeys(d);
        driver.findElement(by.name("create-button")).click();
        driver.sleep(2000).then(() => {
            callback();
        });
    });
    this.Given(/^A deliverable is created with the name "([^"]*)" and weight (\d+) and due on "([^"]*)"$/, function (n, w, d, callback) {
        driver.findElement(by.name("name")).sendKeys(n);
        driver.findElement(by.id("deliverable-weight")).sendKeys(selenium.Key.CONTROL + "a");
        driver.findElement(by.id("deliverable-weight")).sendKeys(w);
        driver.findElement(by.name("due")).sendKeys(d);
        driver.findElement(by.name("create-button")).click();
        driver.sleep(2000).then(() => {
            callback();
        });
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
    this.Given(/^An application is created with name "([^"]*)"$/, function (n,callback) {
        helpers.loadPage('http://localhost:3000/');
        driver.findElement(By.id('student-name')).sendKeys(n);
        driver.findElement(by.id("register-button")).click();
        driver.sleep(1000).then(() => {
            callback();
        });
    });
    this.Then(/^I click on "([^"]*)" "([^"]*)" button in the "([^"]*)" list$/, function (n,b,s, callback) {
        driver.findElement(by.xpath(`//ul[@id='${s}-list']//*[contains(text(),'${n}')]/../../..//button[@name='${b}-button']`)).then((e)=>{
            driver.actions().mouseMove(e).click().perform().then(() => {
                driver.sleep(2000).then(() => {
                    callback();
                });
            });
        })
    });
    this.Then(/^I click the model select and choose "([^"]*)"$/, function (m,callback) {
        driver.findElement(by.className("MuiSelect-selectMenu")).click()
        driver.findElement(by.name(m)).click();
        callback()
    });
    this.Then(/^I set the model name to "([^"]*)"$/, function (n,callback) {
        driver.findElement(by.name("name")).sendKeys(n);
        callback()
    });
    this.Then(/^I set the model email to "([^"]*)"$/, function (e,callback) {
        driver.findElement(by.name("email")).sendKeys(e);
        callback();
    });
    this.Then(/^I set the model birth to "([^"]*)"$/, function (e,callback) {
        driver.findElement(by.name("birth")).sendKeys(e);
        callback();
    });
    this.When(/^I create the model$/, function (callback) {
        driver.findElement(by.name("create-button")).click();
        driver.sleep(1000).then(() => {
            callback();
        });
    });
    this.Then(/^"([^"]*)" should be displayed in the "([^"]*)" list$/, function (n,s,callback) {
        driver.findElement(by.xpath(`//ul[@id='${s}-list']//*[contains(text(),'${n}')]`)).then((e)=>{
            const app = shared.app.api.service(s);
            app.find({
                query: {
                    name: n
                }
                }
            ).then((records) => {
                for (var i = 0; i < records.length; i++) {
                app.remove(records[i].id);
                }
                callback()
            })
        })
    });

    this.Then(/^"([^"]*)" should NOT be displayed in the "([^"]*)" list$/, function (n,s,callback) {
        driver.findElement(by.xpath(`//ul[@id='${s}-list']//*[contains(text(),'${n}')]`)).then((data) => {
            driver.quite()
        }).catch(() => {
            callback()
        })
    });

    this.Then(/^I update the model "([^"]*)" to "([^"]*)"$/, function (field, value, callback) {
        const elem = driver.findElement(by.name(field));
        elem.sendKeys(selenium.Key.CONTROL + "a");
        elem.sendKeys(selenium.Key.DELETE);
        elem.sendKeys(value);
        callback();
      });
    this.When(/^I update the model$/, function (callback) {
        driver.sleep(500).then(() => {
            driver.findElement(by.name("update-button")).click();
            driver.sleep(1000).then(() => {
                callback();
            });
        });
    });
    this.Then(/^Element named "([^"]*)" should be equal to "([^"]*)"$/, function (name,expectedValue,callback) {
        const elem = driver.findElement(by.name(name));
        elem.getAttribute("value").then((v)=>{
            if (v === expectedValue) {
                callback();
            }
        });
    });

};