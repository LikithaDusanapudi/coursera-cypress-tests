class SearchPage {
  courseCards = 'a[data-click-key="search.search.click.search_card"]:visible'

  getCourseTitles(limit = 2) {
    cy.get(this.courseCards).each(($course, index) => {
      if (index < limit) {
        cy.wrap($course).find('h3').invoke('text').then(title => {
          cy.log(`Course ${index + 1}: ${title}`)
        })
      }
    })
  }
}

export default new SearchPage()
