// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// cypress/support/commands.js


Cypress.Commands.add('searchCourse', (searchTerm, language, difficulty) => {
  // Search
  cy.get('[data-testid="search-autocomplete-input"]', { timeout: 10000 })
    .should('not.be.disabled')
    .type(`${searchTerm}{enter}`, { force: true });

  // Filter: Language
  cy.get('[data-testid="filter-dropdown-language"]').click();
  cy.contains('label', language).click();
  cy.contains('button', 'View').click();

  // Filter: Difficulty
  cy.get('[data-testid="filter-dropdown-productDifficultyLevel"]').click({ force: true });
  cy.contains('label', difficulty).click();
  cy.contains('button', 'View').click();
});


Cypress.Commands.add('fillEnterpriseForm', (form) => {
  cy.get('input[name="FirstName"]').clear().type(form.firstName);
  cy.get('input[name="LastName"]').clear().type(form.lastName);
  cy.get('input[name="Email"]').clear().type(form.email);
  cy.get('input[name="Phone"]').clear().type(form.phone);

  cy.get('#Institution_Type__c').select(form.institutionType);
  cy.get('input[name*="Company"]').clear().type(form.company);
  cy.get('#Title').select(form.title);
  cy.get('#Department').select(form.department);
  cy.get('#Self_Reported_Needs__c').select(form.needs);
  cy.get('#Country').select(form.country);
  cy.get('#State').select(form.state);
});
