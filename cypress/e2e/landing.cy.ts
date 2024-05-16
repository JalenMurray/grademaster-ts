describe('Landing Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  // before(() => {
  //   cy.authenticate().then((_) => {
  //     storageCache = { ...localStorage };
  //   });
  // });
  // beforeEach(() => {
  //   cy.visit('/', {
  //     onBeforeLoad(win) {
  //       Object.entries(storageCache).forEach(([k, v]) => {
  //         win.localStorage.setItem(k, '' + v);
  //       });
  //     },
  //   });
  // });

  context('Hero Section', () => {
    it('Hero contains correct information', () => {
      cy.get('h1').contains('Welcome to GradeMaster!');
      cy.get('button').eq(0).contains('Login');
    });
  });

  context('Call to Action', () => {
    it('New User information', () => {});
  });

  context('Social Proof', () => {
    it('Contains social proof', () => {});
  });

  context('Benefits', () => {
    it('Contains Benefits', () => {});
  });

  context('Features', () => {
    it('Contains features', () => {});
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

  // context('Side Menu', () => {
  //   it('Contains brand link', () => {
  //     cy.get('#brand').should('exist');
  //     cy.get('#brand').get('div').contains('GradeMaster');
  //   });

  //   it.only('Contains all correct information', () => {
  //     cy.get('.menu-title').contains('Semesters');
  //     cy.get('.menu ul li').eq(0).should('exist');
  //     cy.get('.menu ul li').eq(0).contains('New Semester');
  //   });

  //   it('New semester button works', () => {});
  //   context('Semester List', () => {
  //     it('Semesters are listed', () => {});
  //     it('Each semeter contains semester detail link and add class button', () => {});
  //     it('Semester classes are listed', () => {});
  //     it('New class button works', () => {});
  //   });
  // });
});
