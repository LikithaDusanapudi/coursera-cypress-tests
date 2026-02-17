describe('Coursera-Identify courses', () => {
  beforeEach(() => {
    cy.visit('https://www.coursera.org/');
    cy.viewport(1200, 900);
  });
  after(() => { 
    cy.log('All tests completed.'); 
});

  it('Task-01: Search and display 2 web development courses', { tags: ['courses'] }, () => { cy.fixture('courses').then((data) => { 
    // Use custom command 
    cy.searchCourse(data.searchTerm, data.filters.language, data.filters.difficulty); 
     //Extract for first 2 course cards: title, duration, rating 
    cy.get('a[data-click-key="search.search.click.search_card"]:visible')
       .each(($course, index) => { 
          if (index < 2) { 
            const card = $course.closest('li'); 
            const title = $course.find('h3').text().trim(); 
            const duration = card.find('.cds-CommonCard-metadata p').text().trim(); 
            const rating = card.find('span.css-4s48ix').text().trim(); 
            cy.log(`**Course ${index + 1}**`); 
            cy.log(`Title: ${title}`); cy.log(`Duration: ${duration}`);
            cy.log(`Rating: ${rating}`); 
          }
        });
    });
});

  it('Task-02: Extract the languages for different levels with count', {tags: ['count']}, () => {
    cy.fixture('levels').then((data) => {
      let result = {};
        cy.get('[data-testid="search-autocomplete-input"]', { timeout: 10000 }) .should('not.be.disabled')
          .type(`${data.searchTerm}{enter}`, { force: true });      
        cy.get('[data-testid="filter-dropdown-productDifficultyLevel"]').click();

        data.levels.forEach((level, i) => {
        result[level] = [];
        cy.get('.cds-checkboxAndRadio-label input[type="checkbox"]').eq(i).check().wait(3000);
        cy.get('[data-testid="filter-view-button"]').click();
        cy.get('[data-testid="filter-dropdown-language"]').click();

        cy.get('.cds-formGroup-groupWrapper')
          .find('.css-ksf52d')
          .each(($ele) => {
            cy.wrap($ele).find('div span span').invoke('text').then(text => {
              let match = text.match(/^([A-Za-z]+).*?\(([\d,]+)\)$/);
              if (match) {
                let key = match[1];
                let value = parseInt(match[2].replace(/,/g, ""));
                result[level].push({ [key]: value });
              }
            });
          });

        cy.get('[data-testid="filter-view-button"]').click();
        cy.get('[data-testid="filter-dropdown-productDifficultyLevel"]').click();
        cy.get('.cds-checkboxAndRadio-label input[type="checkbox"]').eq(0).uncheck();
      });

      cy.then(() => {
        const toDict = arr =>
          arr.reduce((acc, obj) => {
            const [lang, val] = Object.entries(obj)[0];
            acc[lang] = val;
            return acc;
          }, {});

        const beginnerDict = toDict(result["Beginner"]);
        const intermediateDict = toDict(result["Intermediate"]);
        const advancedDict = toDict(result["Advanced"]);
        const mixedDict = toDict(result["Mixed"]);

        const allLanguages = new Set([
          ...Object.keys(beginnerDict),
          ...Object.keys(intermediateDict),
          ...Object.keys(advancedDict),
          ...Object.keys(mixedDict)
        ]);

        allLanguages.forEach(lang => {
          cy.log(
            `${lang} ===> Beginner: ${beginnerDict[lang] || 0}, ` +
            `Intermediate: ${intermediateDict[lang] || 0}, ` +
            `Advanced: ${advancedDict[lang] || 0}, ` +
            `Mixed: ${mixedDict[lang] || 0}`
          );
        });

        const totals = {};
        allLanguages.forEach(lang => {
          totals[lang] =
            (beginnerDict[lang] || 0) +
            (intermediateDict[lang] || 0) +
            (advancedDict[lang] || 0) +
            (mixedDict[lang] || 0);
        });
        cy.log("Totals: " + JSON.stringify(totals));
      });
    });
  });

  it('Task-03: Enterprise > Campus form with multiple datasets', () => {
  cy.fixture('enterprise').then((datasets) => {
    datasets.forEach((form) => {
      cy.on('uncaught:exception', () => false);

      cy.contains('For Enterprise').click();
      cy.contains('For Campus').click();

      cy.get('[data-testid="how_module_hero_heading"]', { timeout: 10000 })
        .should('be.visible');

      // Use custom command
      cy.fillEnterpriseForm(form);

      cy.contains('Submit').click({ force: true });

      if (form.expectedError) {
        cy.get('#ValidMsgEmail', { timeout: 10000 })
          .should('be.visible')
          .then($msg => {
            cy.log(`Error for ${form.email}: ${$msg.text()}`);
          });
      } else {
        cy.get('#ValidMsgEmail').should('not.exist');
        cy.log(`Form submitted successfully for ${form.email}`);
      }
    });
  });
});
});
