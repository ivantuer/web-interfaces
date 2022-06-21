Cypress.Commands.add('login', () => {
  cy.visit('/login');
  cy.intercept('http://localhost:5000/auth/me', {}).as('me');
  cy.wait('@me');

  cy.get('input[name="email"]').type('email@email.com');
  cy.get('input[name="password"]').type('password');

  cy.intercept('http://localhost:5000/auth/login', {
    email: 'email@email.com',
    token: 'test-token',
    name: 'name',
    birthday: '2000-12-12',
  }).as('signIn');

  cy.get('button[type="submit"]').click();
});
