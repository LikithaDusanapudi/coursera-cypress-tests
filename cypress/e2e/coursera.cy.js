import homePage from '../pages/homePage'
import searchPage from '../pages/searchPage'
import enterprisePage from '../pages/enterprisePage'

describe('Coursera Project Tests', () => {
  it('Search and display 2 web development courses', () => {
    homePage.visit()
    homePage.searchCourse('Web Development')
    searchPage.getCourseTitles(2)
  })

  it('Enterprise > Campus form submission', () => {
    enterprisePage.openForm()
    enterprisePage.fillForm({ email: 'test@example.com' })
  })
})
