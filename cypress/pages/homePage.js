class HomePage {
  searchInput = '[data-testid="search-autocomplete-input"]'
  searchButton = '[data-testid="search-search-button"]'

  visit() {
    cy.visit('https://www.coursera.org')
  }

  searchCourse(term) {
    cy.get(this.searchInput).type(`${term}{enter}`, { force: true })
  }
}

export default new HomePage()
