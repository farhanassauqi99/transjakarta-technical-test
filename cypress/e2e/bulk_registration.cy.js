import webTablesPage from '../pages/WebTablesPage';
const neatCSV = require('neat-csv');

describe('Technical Test - Web Tables (PT Transportasi Jakarta)', () => {
  let testUsers = [];

  before(() => {
    cy.fixture('users.csv')
      .then(neatCSV)
      .then((data) => {
        testUsers = data;
      });
  });

  beforeEach(() => {
    webTablesPage.visit();
  });

  // 4.1 POSITIVE TEST CASE
  it('4.1 Positive Test - Berhasil mendaftarkan banyak user dari file CSV', () => {
    testUsers.forEach((user) => {
      cy.log(`Registering: ${user.firstName} ${user.lastName}`);
      webTablesPage.registerUser(user);
      webTablesPage.verifyUserInTable(user.email);
    });

    // Toast passed
    cy.showToast('4.1 Positive Test PASSED: Semua User CSV Berhasil Didaftarkan!', 'success');
    cy.wait(3000);
  });

  // 4.2 NEGATIVE TEST CASE
  it('4.2 Negative Test - Gagal submit saat field email dikosongkan', () => {
    const invalidUser = {
      firstName: 'Testing',
      lastName: 'Negative',
      email: '',
      age: '28',
      salary: '8000000',
      department: 'QA Automation'
    };

    webTablesPage.clickAdd();
    webTablesPage.fillRegistrationForm(invalidUser);
    webTablesPage.submitForm();

    webTablesPage.verifyFormHasError();
    cy.wait(3000);

    // Toast passed
    cy.showToast('4.2 Negative Test PASSED: Form Validation Error Berhasil Terverifikasi!', 'info');
    cy.wait(3000);
    webTablesPage.verifyUserNotInTable('Testing');
    webTablesPage.closeModal();
  });
});