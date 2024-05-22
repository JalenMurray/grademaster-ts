/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import { Amplify } from 'aws-amplify';
import { SignInOutput, signIn, getCurrentUser } from 'aws-amplify/auth';
import outputs from '../../amplify_outputs.json';
import hexRgb from 'hex-rgb';
Amplify.configure(outputs, { ssr: true });

type AssignmentTypeInput = {
  name: string;
  maxScore: number;
  defaultName: string;
  lockWeights: boolean;
  weight?: number;
};

declare global {
  namespace Cypress {
    interface Chainable {
      authenticate(): Promise<SignInOutput>;
      getByData(dataTestAttribute: string, extras?: string): Chainable<JQuery<HTMLElement>>;
      textColorIs(hex: string): boolean;
      addAssignmentType(assignmentType: AssignmentTypeInput);
    }
  }
}

Cypress.Commands.add('authenticate', async () => {
  const output = await signIn({
    username: Cypress.env('USERNAME'),
    password: Cypress.env('PASSWORD'),
  });
  return output;
});

Cypress.Commands.add('getByData', (selector, extras) => {
  return extras ? cy.get(`[data-test=${selector}] ${extras}`) : cy.get(`[data-test=${selector}]`);
});

Cypress.Commands.add('textColorIs', { prevSubject: true }, (subject, hex) => {
  const rgb = hexRgb(hex);
  const rgbStr = `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`;
  expect(rgbStr).to.eq(subject[0].style.color);
});

Cypress.Commands.add('addAssignmentType', (assignmentType: AssignmentTypeInput) => {
  const { name, maxScore, defaultName, lockWeights, weight } = assignmentType;
  cy.getByData('actionButtons', 'button').eq(1).click();
  cy.getByData('newAssignmentTypeForm', 'input').eq(1).type(name);
  cy.getByData('newAssignmentTypeForm', 'input').eq(2).type(maxScore.toString());
  cy.getByData('newAssignmentTypeForm', 'input').eq(3).type(defaultName);
  if (lockWeights) {
    cy.getByData('newAssignmentTypeForm', 'input').eq(5).type(weight.toString());
  } else {
    cy.getByData('newAssignmentTypeForm', 'input').eq(4).click();
  }
  cy.getByData('newAssignmentTypeForm', 'button').click();
});
