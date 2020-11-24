module.exports = function () {
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
    this.When(/^I create the model$/, function (callback) {
        driver.findElement(by.name("create-button")).click();
        driver.sleep(1000).then(() => {
            callback();
        });
    });
    this.Then(/^"([^"]*)" should be displayed in the "([^"]*)" list$/, function (n,s,callback) {
        let textFound = false;
        driver.findElement(by.id(`${s}-list`)).then((list) => {
            list.findElements(by.className("MuiListItemText-primary")).then((elements) => {
                elements.forEach(function (element) {
                    element.getAttribute('innerHTML').then(function(text){
                        if (text === n) { 
                            textFound = true;
                        }
                    })
                });
            })
        }).then(() => {
            if (textFound) {
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
            }
        });
    });
    this.Then(/^"([^"]*)" should NOT be displayed in the "([^"]*)" list$/, function (n,m,callback) {
        let textFound = false;
        driver.findElement(by.id(`${m}-list`)).then((list) => {
            list.findElements(by.className("MuiListItemText-primary")).then((elements) => {
                elements.forEach(function (element) {
                    element.getAttribute('innerHTML').then(function(text){
                        if (text === n) { 
                            textFound = true;
                        }
                    });
                });
            })
        }).then(() => {
            if (!(textFound)) {
                callback();
              }
            }
        );
    });
}