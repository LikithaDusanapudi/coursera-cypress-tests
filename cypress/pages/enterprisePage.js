class EnterprisePage {
  enterpriseLink = 'a:contains("For Enterprise")'
  campusLink = 'a:contains("For Campus")'
  emailField = '#Email'
  submitButton = 'button:contains("Submit")'

  openForm() {
    cy.contains('For Enterprise').click()
    cy.contains('For Campus').click()
  }

  fillForm(formData) {
    cy.get(this.emailField).type(formData.email)
    cy.get(this.submitButton).click({ force: true })
  }
}

export default new EnterprisePage()
