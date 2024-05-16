let storageCache;
const currDate = new Date();
const currYear = currDate.getFullYear();
const currMonth = currDate.getMonth();

function getDefaultSemester(): string {
  if (currMonth < 1 || currMonth == 11) {
    return 'Winter';
  } else if (currMonth < 5) {
    return 'Spring';
  } else if (currMonth < 8) {
    return 'Summer';
  } else {
    return 'Fall';
  }
}

describe('Calculator', () => {
  beforeEach(() => {
    cy.authenticate();
  });

  context('Side Menu', () => {
    beforeEach(() => {
      cy.visit('/calculator');
    });

    it('Contains brand link', () => {
      cy.get('#brand').should('exist');
      cy.get('#brand').get('div').contains('GradeMaster');
    });

    it('Contains all correct information', () => {
      cy.get('.menu-title').contains('Semesters');
      cy.get('.menu ul li').eq(0).should('exist');
      cy.get('.menu ul li').eq(0).contains('New Semester');
    });

    context('Semester List', () => {
      it('Semesters are listed', () => {
        // Test data has 4 Semesters
        cy.getByData('semesterDropdown')
          .should('have.length', 4)
          .each((semester, i) => {
            const SEMESTER_ORDER = ['Spring 2024', 'Summer 2022', 'Winter 2021', 'Fall 2020'];
            const CLASS_ORDER = [
              ['CMSC421', 'SOCY410'],
              ['CMSC351', 'ENGL393', 'SOCY342'],
              ['AASP200', 'AOSC200', 'AOSC201', 'CMSC216'],
              ['CMSC131', 'COMM107', 'CPET101', 'MATH140'],
            ];
            const semesterId = semester[0].id;
            // Ensure in correct semester
            cy.wrap(semester).contains(SEMESTER_ORDER[i]);
            /*
              Get the list items in the semester dropdown and ensure that the first two
              are 'Semester Details' and New Class Button respectively and that the remaining
              list items correspond to the classes and contain the relevant links for the classes.
            */
            cy.wrap(semester)
              .children('ul')
              .children('li')
              .each((elem, j) => {
                if (j > 1) {
                  const cls = CLASS_ORDER[i][j - 2];
                  cy.wrap(elem).contains(cls);
                } else if (j === 0) {
                  cy.wrap(elem)
                    .contains('Semester Details')
                    .should('have.attr', 'href')
                    .and('equal', `/calculator/semester/${semesterId}`);
                } else {
                  cy.wrap(elem)
                    .contains('New Class')
                    .should('have.attr', 'data-test')
                    .and('equal', 'openModalButton');
                }
              });
          });
      });

      it('New class button works', () => {
        cy.get('#new_class_modal').should('not.be.visible');
        cy.getByData('semesterDropdown')
          .eq(0)
          .then((dropdown) => {
            // Open Dropdown so button is visible
            cy.wrap(dropdown).click();
            // Click New Class button
            cy.wrap(dropdown)
              .children('ul')
              .children('li')
              .eq(1)
              .children()
              .should('exist')
              .contains('New Class')
              .click();
            cy.get('#new_class_modal').should('be.visible');
          });
      });

      it('New class modal contains correct fields', () => {
        cy.get('#new_class_modal').should('not.be.visible');
        let semesterId;
        cy.getByData('semesterDropdown')
          .eq(0)
          .then((dropdown) => {
            semesterId = dropdown[0].id;
            // Open Dropdown so button is visible
            cy.wrap(dropdown).click();
            // Click New Class button
            cy.wrap(dropdown)
              .children('ul')
              .children('li')
              .eq(1)
              .children()
              .should('exist')
              .contains('New Class')
              .click();
            cy.get('#new_class_modal').should('be.visible');
          });
        cy.getByData('newClassForm').should('be.visible');
        cy.getByData('newClassForm', 'h3').contains('New Class');
        // Semester Id (Hidden)
        /*
          This is set in the onClick for OpenModal and I'm not seeing it reflected in the DOM
          But the functionality is working, so I'll just check that it exists for now
        */
        cy.getByData('newClassForm', 'input')
          .eq(1)
          .should('have.attr', 'name')
          .and('equal', 'semesterId');
        // Code
        cy.getByData('newClassForm', 'label').eq(0).contains('Code');
        cy.getByData('newClassForm', 'input').eq(2).should('have.value', '');
        // Class Name
        cy.getByData('newClassForm', 'label').eq(1).contains('Class Name');
        cy.getByData('newClassForm', 'input').eq(3).should('have.value', '');
        // Desired Score
        cy.getByData('newClassForm', 'label').eq(2).contains('Desired Score');
        cy.getByData('newClassForm', 'input').eq(4).should('have.value', 100);
        cy.getByData('newClassForm', 'input')
          .eq(4)
          .should('have.attr', 'type')
          .and('equal', 'number');
        // Units
        cy.getByData('newClassForm', 'label').eq(3).contains('Units');
        cy.getByData('newClassForm', 'input').eq(5).should('have.value', 3);
        cy.getByData('newClassForm', 'input')
          .eq(5)
          .should('have.attr', 'type')
          .and('equal', 'number');
        // Display Color
        /*
          Similarly to SemesterId, I'm unsure how to test this besides checking that the fields exists since it 
          does not show updates in the DOM.  This is also a third party component, so I don't believe I need to
          test it much anyways.
        */
        cy.getByData('newClassForm', 'label').eq(4).contains('Display Color');
        cy.get('#display-color-string').should('exist');
      });
    });

    context('New Semester UI', () => {
      it('New semester button works', () => {
        cy.get('#new_semester_modal').should('not.be.visible');
        cy.getByData('openModalButton').eq(0).contains('New Semester').click();
        cy.get('#new_semester_modal').should('be.visible');
      });

      it('New semester modal contains correct fields', () => {
        cy.getByData('openModalButton').eq(0).click();
        cy.getByData('newSemesterForm').should('be.visible');
        cy.getByData('newSemesterForm', 'h3').contains('New Semester');
        // Season
        cy.getByData('newSemesterForm', 'label').eq(0).contains("Select the Semester's Season");
        cy.getByData('newSemesterForm', 'option').each((option, i) => {
          let season = 'Winter'; // 0 Should be Winter
          if (i === 1) {
            season = 'Spring';
          } else if (i === 2) {
            season = 'Summer';
          } else if (i === 3) {
            season = 'Fall';
          }
          cy.wrap(option).contains(season).should('have.value', season);
        });
        cy.getByData('newSemesterForm', 'select').should('have.value', getDefaultSemester());
        // Year
        cy.getByData('newSemesterForm', 'label').eq(1).contains('Year');
        cy.getByData('newSemesterForm', 'input')
          .eq(1)
          .should('have.attr', 'type')
          .and('equal', 'number');
        cy.getByData('newSemesterForm', 'input').eq(1).should('have.value', currYear);
        // Current Semester Checkbox
        cy.getByData('newSemesterForm', 'label').eq(2).contains('Current Semester');
        cy.getByData('newSemesterForm', 'input')
          .eq(2)
          .should('have.attr', 'type')
          .and('equal', 'checkbox');
        cy.getByData('newSemesterForm', 'input').eq(2).should('have.attr', 'checked');
      });

      /* 
      No Longer testing API calls because I don't know how to intercept them correctly. Maybe one day :D
      */
      // it.only('Submit new semester', () => {
      //   cy.intercept('POST', '**/graphql', (req) => {
      //     console.log('REQUEST', req.body);
      //   }).as('graphQL POST');
      //   cy.getByData('openModalButton').click();
      //   cy.getByData('newSemesterForm', 'button').click();
      // });
    });
  });

  context('Semester Detail Page', () => {
    beforeEach(() => {
      // Semester ID to test.  Is the Spring 2024 Semester
      const semesterId = 'f1eb6d17-1dbe-4e1f-bcbb-7119dc6a4269';
      cy.visit(`/calculator/semester/${semesterId}`);
    });

    it('Able to navigate to correct semester detail page using UI', () => {
      cy.visit('/calculator');
      cy.getByData('semesterDropdown')
        .eq(0)
        .then((dropdown) => {
          cy.wrap(dropdown).click();
          cy.wrap(dropdown).children('ul').children('li').eq(0).click();
        });
      cy.get('h1').contains('Spring 2024');
    });

    it('Able to navigate to correct semester detail page using URL', () => {
      cy.get('h1').contains('Spring 2024');
    });

    it('Action buttons are correct', () => {
      cy.getByData('actionButtons', 'button').eq(0).contains('Edit Semester');
      cy.getByData('actionButtons', 'button').eq(1).contains('New Class');
      cy.getByData('actionButtons', 'button').eq(2).contains('Delete Semester');
    });

    // Modal Tests already done above since it opens the same modal
    it('New class button works', () => {
      cy.get('#new_class_modal').should('not.be.visible');
      cy.getByData('actionButtons', 'button').eq(1).click();
      cy.get('#new_class_modal').should('be.visible');
      cy.getByData('newClassForm').should('be.visible');
    });
  });

  // context('Navbar', () => {
  //   it('Includes theme toggle', () => {
  //     cy.get('#theme-toggle').should('exist');
  //     cy.get('.theme-controller').should('have.value', 'light');
  //   });

  //   it('Includes account button', () => {
  //     cy.get('#account-button').should('exist');
  //     cy.get('#account-button').contains(Cypress.env('cognito_username'));
  //   });
  // });
});
