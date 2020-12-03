
module.exports = function () {
    this.Then(/^I click on unregister professor button$/, function (callback) {
    driver.findElement(By.id('unregister-professor-button')).click();
    driver.sleep(1000).then(() => {
      callback();
    });
    });

    this.Given(/^"([^"]*)" is a professor of course "([^"]*)"$/, function (arg1, arg3, callback) {
        const app = shared.app.api.service('course');
        const app2 = shared.app.api.service('professor')
        app.find({
            query: {
                name: arg3
            }
        }
        ).then((course) => {
            app2.find({
                query: {
                    name: arg1
                }
            }).then((prof) => {
                app.patch(course[0].id, { professorId: prof[0].id });
                callback()
            })
        })
    });

    this.Given(/^"([^"]*)" is NOT a professor of course "([^"]*)"$/, function (arg1, arg3, callback) {
        const app = shared.app.api.service('course');
        app.find({
            query: {
                name:arg3
            }
        }
        ).then((record) => {
            app.patch(record[0].id, { professorId: null }).then(() => {
                callback()
            });
        })
    });


    this.Given(/^"([^"]*)" is a student of course "([^"]*)"$/, function (arg1, arg3, callback) {
        const app = shared.app.api.service('course');
        const app2 = shared.app.api.service('student');
        const app3 = shared.app.api.service('enrolled');
        app.find({
            query: {
                name:arg3
            }
        }
        ).then((course) => {
            app2.find({
                query: {
                    name:arg1
                }
            }).then((student) => {
            console.log(student);
                app3.create({ studentId: student[0].id, courseId: course[0].id }).then(() => {
                    callback()
                });
            })
        })
    });
    

    this.Given(/^"([^"]*)" is NOT a student of course "([^"]*)"$/, function (arg1, arg3, callback) {
        const app = shared.app.api.service('course');
        const app2 = shared.app.api.service('student');
        const app3 = shared.app.api.service('enrolled');
        app.find({
            query: {
                name: arg3
            }
        }
        ).then((course) => {
            app2.find({
                query: {
                    name: arg1
                }
            }).then((student) => {
                app3.remove(null, { query: { studentId: student[0].id, courseId: course[0].id } }).then(() => {
                callback()
                });
            })
        })
    });
};