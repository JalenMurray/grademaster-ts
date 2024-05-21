describe('Guest Page', () => {
  before(() => {
    cy.visit('/guest');
    cy.wait(300);
  });

  context.only('Header', () => {
    it('Code and class name are correct', () => {
      cy.get('h1').contains('GUEST100');
      cy.get('h1 span').contains('Guest Class');
    });
    it('Correct actions displayed', () => {
      cy.getByData('actionButtons', 'button').should('have.length', '2');
      cy.getByData('actionButtons', 'button').eq(0).contains('Edit Class');
      cy.getByData('actionButtons', 'button').eq(1).contains('New Assignment Type');
    });
    it.only('Edit class button works', () => {});
    it('New Assignment Type button works', () => {});
  });

  context('Grade Calculator', () => {
    context('Assignment Type', () => {
      it('Assignment types are listed correctly', () => {});
      it('Assignment types dropdown works', () => {});
      it('Correct assignment type beginning information is shown', () => {});
      it('Able to edit assignment type name and weight, when applicable', () => {});
      it('New Assignment button works', () => {});
      it('Lock Weights button works', () => {});
      it('Delete assignment type button works', () => {});
      it('Weighted scores and lost points update correctly', () => {});
      it('Weight changable/unchangable based on lockWeights', () => {});
      it('Class score changes when assignment type scores do', () => {});
      it('Field validation', () => {});
    });

    context('Assignment', () => {
      it('Assignments are listed correctly', () => {});
      it('Correct default information is shown', () => {});
      it('Able to edit name, score, and max score', () => {});
      it('Able to edit weight when applicable', () => {});
      it('Assignment updates also update assignment type and class', () => {});
      it('Delete assignment works', () => {});
      it('Weighted score and lost points update correctly', () => {});
      it('Assignment weights correctly balance', () => {});
      it('Field validation', () => {});
    });

    context('Progress Bar', () => {
      it('Shows correct score', () => {});
      it('Shows correct bar color', () => {});
    });

    context('Warnings', () => {
      it('Shows correct warnings', () => {});
      it('Warnings are removed when applicable', () => {});
    });
  });
});
