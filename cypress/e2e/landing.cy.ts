describe('Landing Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  context('Default Page', () => {
    context.only('Hero Section', () => {
      it('Hero contains correct information', () => {
        cy.get('h1').contains('Welcome to GradeMaster!');
      });
    });
  });

  context('Navbar', () => {
    it('Navbar includes theme toggle', () => {
      cy.get('#theme-toggle').should('exist');
      cy.get('.theme-controller').should('have.value', 'light');
    });
  });

  context('Side Menu', () => {
    it('Contains brand link', () => {
      cy.get('#brand').should('exist');
      cy.get('#brand').get('div').contains('GradeMaster');
    });

    it('New semester button works', () => {});
    context('Semester List', () => {
      it('Semesters are listed', () => {});
      it('Each semeter contains semester detail link and add class button', () => {});
      it('Semester classes are listed', () => {});
      it('New class button works', () => {});
    });
  });
});
