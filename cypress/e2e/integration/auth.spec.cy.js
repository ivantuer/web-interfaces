// eslint-disable-next-line no-undef
require('./common');

describe('tests', () => {
  it('should sign up as user', () => {
    cy.visit('/sign-up');
    cy.intercept('http://localhost:5000/auth/me', {}).as('me');

    cy.wait('@me');
    cy.get('input[name="email"]').type('email@email.com');
    cy.get('input[name="password"]').type('password');
    cy.get('input[name="name"]').type('name');
    cy.get('input[name="birthday"]').type('2000-12-12');
    cy.get('input[name="gender"]').click();
    cy.get('li').first().click();

    cy.intercept('http://localhost:5000/auth/sign-up', {
      email: 'email@email.com',
      token: 'test-token',
      name: 'name',
      birthday: '2000-12-12',
    }).as('signUp');

    cy.get('button[type="submit"]').click();
  });

  it('should sign in as user', () => {
    cy.login();
  });
});
