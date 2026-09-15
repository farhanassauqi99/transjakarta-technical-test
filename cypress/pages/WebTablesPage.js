class WebTablesPage {
  elements = {
    addButton: () => cy.get('#addNewRecordButton'),
    registrationModal: () => cy.get('.modal-dialog'),
    firstNameInput: () => cy.get('#firstName'),
    lastNameInput: () => cy.get('#lastName'),
    userEmailInput: () => cy.get('#userEmail'),
    ageInput: () => cy.get('#age'),
    salaryInput: () => cy.get('#salary'),
    departmentInput: () => cy.get('#department'),
    submitButton: () => cy.get('#submit'),
    userForm: () => cy.get('#userForm')
  };

  visit() {
    cy.on('uncaught:exception', () => false);
    cy.visit('https://demoqa.com/webtables', {
      timeout: 60000,
      failOnStatusCode: false
    });
    cy.get('body').should('be.visible');
  }

  clickAdd() {
    this.elements.addButton()
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });
    this.elements.registrationModal().should('be.visible');
  }

  fillRegistrationForm(userData) {
    if (userData.firstName) this.elements.firstNameInput().clear().type(userData.firstName);
    if (userData.lastName) this.elements.lastNameInput().clear().type(userData.lastName);
    if (userData.email) this.elements.userEmailInput().clear().type(userData.email);
    if (userData.age) this.elements.ageInput().clear().type(userData.age);
    if (userData.salary) this.elements.salaryInput().clear().type(userData.salary);
    if (userData.department) this.elements.departmentInput().clear().type(userData.department);
  }

  submitForm() {
    this.elements.submitButton().click({ force: true });
  }

  registerUser(userData) {
    this.clickAdd();
    this.fillRegistrationForm(userData);
    this.submitForm();
    this.elements.registrationModal().should('not.exist');
  }

  verifyUserInTable(email) {
    cy.contains(email, { timeout: 10000 }).should('be.visible');
  }

  verifyUserNotInTable(email) {
    cy.contains(email).should('not.exist');
  }

  verifyFormHasError() {
    this.elements.userForm().should('have.class', 'was-validated');
    this.elements.registrationModal().should('be.visible');
  }

  closeModal() {
    cy.get('body').then(($body) => {
      if ($body.find('.modal-header button.close').length > 0) {
        cy.get('.modal-header button.close').click({ force: true });
      } else {
        cy.get('body').type('{esc}');
      }
    });
    this.elements.registrationModal().should('not.exist');
  }
}

export default new WebTablesPage();