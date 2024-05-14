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

declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(username: string, password: string): Chainable<void>;
  }
}

const login = (username: string, password: string) => {
  Cypress.log({
    displayName: 'COGNITO LOGIN',
    message: [`Authenticating | ${username}`],
    autoEnd: false,
  });
  cy.origin(
    Cypress.env('cognito_domain'),
    { args: { username, password } },
    ({ username, password }) => {
      cy.contains('Sign in with your email and password');
      cy.get('input[name="username"]:visible').type(username);
      cy.get('input[name="password"]:visible').type(password, {
        // use log: false to prevent your password from showing in the Command Log
        log: false,
      });
      cy.get('input[name="signInSubmitButton"]:visible').click();
    }
  );
  cy.wait(2000);
  cy.contains('Welcome to GradeMaster!').should('be.visible');
};

Cypress.Commands.add('login', (username: string, password: string) => {
  return login(username, password);
});
