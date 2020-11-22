// eslint-disable-next-line no-unused-vars
const { service: academicDeadlineService} = require('./academicDeadline');
const { service: administratorService} = require('./administrator');
const { service: applicationService} = require('./application');
const { service: courseService} = require('./course');
const { service: deliverableService} = require('./deliverable');
const { service: enrolledService} = require('./enrolled');
const { service: prerequisiteService} = require('./prerequisite');
const { service: professorService} = require('./professor');
const { service: studentService} = require('./student');
const { service: submitsService} = require('./submits');
const { service: teachesService} = require('./teaches');
const { service: loginCredentialService } = require('./loginCredential');

const services = (app) => {
  app.configure(academicDeadlineService);
  app.configure(administratorService);
  app.configure(applicationService);
  app.configure(courseService);
  app.configure(deliverableService);
  app.configure(enrolledService);
  app.configure(prerequisiteService);
  app.configure(professorService);
  app.configure(studentService);
  app.configure(submitsService);
  app.configure(teachesService);
  app.configure(loginCredentialService);
};

module.exports = {
  services
};
