class SearchPage {
  languageDropdown = '[data-testid="filter-dropdown-language"]'
  difficultyDropdown = '[data-testid="filter-dropdown-productDifficultyLevel"]'
  courseCards = 'a[data-click-key="search.search.click.search_card"]'

  // --- Task-01 methods ---
  filterLanguage(language) {
    cy.get(this.languageDropdown).click()
    cy.contains('span.cds-checkboxAndRadio-labelContent', language, { timeout: 10000 })
      .scrollIntoView()
      .click({ force: true })
    cy.contains('button', 'View').click()
  }

  filterDifficulty(level) {
    cy.get(this.difficultyDropdown).click({ force: true })
    cy.contains('span.cds-checkboxAndRadio-labelContent', level, { timeout: 10000 })
      .scrollIntoView()
      .click({ force: true })
    cy.contains('button', 'View').click()
  }

  getFirstTwoCourses() {
    cy.get(this.courseCards, { timeout: 10000 }).each(($course, index) => {
      if (index < 2) {
        const card = $course.closest('li')

        const title = $course.find('h3').text().trim()
        const duration = card.find('.cds-CommonCard-metadata p').text().trim()
        const rating = card.find('span.css-4s48ix').text().trim()

        cy.log(`**Course ${index + 1}**`)
        cy.log(`Title: ${title}`)
        cy.log(`Duration: ${duration}`)
        cy.log(`Rating: ${rating}`)
      }
    })
  }

  // --- Task-02 methods ---
  openDifficultyFilter() {
    cy.get(this.difficultyDropdown, { timeout: 10000 }).click()
  }

  selectDifficulty(optionText) {
    cy.contains('span.cds-checkboxAndRadio-labelContent', optionText, { timeout: 10000 })
      .scrollIntoView()
      .click({ force: true })
    cy.contains('button', 'View').click()
  }

  openLanguageFilter() {
    cy.get(this.languageDropdown, { timeout: 10000 }).click()
  }

  extractLanguagesForLevel(level, result) {
    cy.get('span.cds-checkboxAndRadio-labelContent').each(($option) => {
      const text = $option.text().trim()
      const countMatch = text.match(/\((\d+)\)/)
      if (countMatch) {
        const language = text.replace(/\(\d+\)/, '').trim()
        const count = parseInt(countMatch[1])
        result[level].push({ language, count })
      }
    })
    cy.contains('button', 'View').click()
  }
}

export default new SearchPage()