// cypress/e2e/coursera.cy.js
import homePage from '../pages/homePage'
import searchPage from '../pages/searchPage'
import enterprisePage from '../pages/enterprisePage'

describe('Coursera Project ', () => {
  beforeEach(() => {
    homePage.visit()
  })

  after(() => {
    cy.log('All tests completed.')
  })

  it('Task-01: Search and display 2 web development courses', { tags: '@display' }, () => {
    cy.fixture('courses').then((data) => {
      homePage.searchCourse(data.searchTerm)
      searchPage.filterLanguage(data.filters.language)
      searchPage.filterDifficulty(data.filters.difficulty)
      searchPage.getFirstTwoCourses()
    })
  })

  it('Task-02: Extract the languages for different levels with count', { tags: '@count' }, () => {
    cy.fixture('levels').then((data) => {
      let result = {}
      homePage.searchCourse(data.searchTerm)

      // Loop through levels by visible text
      data.levels.forEach((level) => {
        result[level] = []
        searchPage.openDifficultyFilter()
        searchPage.selectDifficulty(level)   // ✅ pass text like "Beginner"
        searchPage.openLanguageFilter()
        searchPage.extractLanguagesForLevel(level, result)
      })

      cy.then(() => {
        Object.keys(result).forEach((level) => {
            cy.log(`=== ${level} ===`)
            result[level].forEach(({ language, count }) => {
                cy.log(`${language}: ${count}`)
            })
        })
      })
    })
  })

  it('Task-03: Enterprise > Campus form with multiple datasets', { tags: '@form' }, () => {
    cy.fixture('enterprise').then((datasets) => {
      datasets.forEach((form) => {
        cy.on('uncaught:exception', () => false)

        enterprisePage.openForm()
        enterprisePage.fillForm(form)

        if (form.expectedError) {
          cy.get('#ValidMsgEmail', { timeout: 10000 })
            .should('be.visible')
            .then($msg => {
              cy.log(`Error for ${form.email}: ${$msg.text()}`)
              cy.screenshot(`invalid-email-${form.email}`)
            })
        } else {
          cy.get('#ValidMsgEmail').should('not.exist')
          cy.log(`Form submitted successfully for ${form.email}`)
          cy.screenshot(`valid-email-${form.email}`)
        }
      })
    })
  })
})
