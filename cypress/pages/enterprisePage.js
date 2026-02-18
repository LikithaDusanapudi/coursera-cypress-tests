// cypress/pages/enterprisePage.js
class EnterprisePage {
  formFields = {
    firstName: '#FirstName',
    lastName: '#LastName',
    email: '#Email',
    phone: '#Phone',
    institutionType: '#Institution_Type__c',
    company: '#Company',
    title: '#Title',
    department: '#Department',
    needs: '#Self_Reported_Needs__c',
    country: '#Country',
    state: '#State'
  }

  openForm() {
    cy.contains('For Enterprise').click()
    cy.wait(2000) // wait for dropdown
    cy.get('a[href*="campus"]').first().click()
    cy.get(this.formFields.firstName, { timeout: 10000 }).should('be.visible')
  }

  fillForm(data) {
    // text inputs
    cy.get(this.formFields.firstName).clear().type(data.firstName)
    cy.get(this.formFields.lastName).clear().type(data.lastName)
    cy.get(this.formFields.email).clear().type(data.email)
    cy.get(this.formFields.phone).clear().type(data.phone)
    cy.get(this.formFields.company).clear().type(data.company)

    // dropdowns
    if (data.institutionType) {
      cy.get(this.formFields.institutionType).select(data.institutionType)
    }
    if (data.title) {
      cy.get(this.formFields.title).select(data.title)
    }
    if (data.department) {
      cy.get(this.formFields.department).select(data.department)
    }
    if (data.needs) {
      cy.get(this.formFields.needs).select(data.needs)
    }
    if (data.country) {
      cy.get(this.formFields.country).select(data.country)
    }
    if (data.state) {
      cy.get(this.formFields.state).select(data.state)
    }

    cy.contains('button', 'Submit').click()
  }
}

export default new EnterprisePage()
