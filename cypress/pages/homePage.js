// cypress/pages/homePage.js
class HomePage {
  searchInput = '[data-testid="search-autocomplete-input"]'

  visit() {
    cy.visit('https://www.coursera.org/')
    cy.viewport(1200, 900)
    // wait until the search bar is present
    cy.get(this.searchInput, { timeout: 15000 }).should('exist')
  }

  searchCourse(term) {
    cy.get(this.searchInput, { timeout: 15000 })
      .should('be.visible')
      .type(`${term}{enter}`)
  }
}

export default new HomePage()
