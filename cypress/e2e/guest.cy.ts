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
    it('Edit class button works', () => {
      cy.get('h1').contains('GUEST100').textColorIs('#FF0000');
      cy.get('h1 span').contains('Guest Class');
      cy.getByData('desiredScore', 'span').contains('100');
      cy.get('#edit_class_modal').should('not.be.visible');
      cy.getByData('actionButtons', 'button').eq(0).click();
      cy.get('#edit_class_modal').should('be.visible');
      cy.getByData('editClassForm', 'input').eq(0).type('CMSC131');
      cy.getByData('editClassForm', 'input').eq(1).type('Object-Orientated Programming I');
      cy.getByData('editClassForm', 'input').eq(2).type('70');
      cy.getByData('editClassForm', 'input')
        .eq(3)
        .then((input) => {
          input[0].setAttribute('value', '#0000FF');
        });
      cy.getByData('editClassForm', 'button').click();
      cy.get('h1').contains('CMSC131').textColorIs('#0000FF');
      cy.get('h1 span').contains('Object-Orientated Programming I');
      cy.getByData('desiredScore', 'span').contains('70');
    });
    it.only('New Assignment Type button works', () => {
      cy.get('#new_assignment_type_modal').should('not.be.visible');
      cy.getByData('actionButtons', 'button').eq(1).click();
      cy.get('#new_assignment_type_modal').should('be.visible');
      cy.getByData('newAssignmentTypeForm', 'input').eq(1).type('Quizzes');
      cy.getByData('newAssignmentTypeForm', 'input').eq(2).type('10');
      cy.getByData('newAssignmentTypeForm', 'input').eq(3).type('Quiz');
      cy.getByData('newAssignmentTypeForm', 'input').eq(5).type('20');
      cy.getByData('newAssignmentTypeForm', 'button').click();
      cy.getByData('assignmentTypes').eq(0).contains('Quizzes');
    });
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

    context('Desired Score', () => {
      it('Shows correct distance', () => {});
      it('Shows success message if desired score was reached', () => {});
    });
  });
});
