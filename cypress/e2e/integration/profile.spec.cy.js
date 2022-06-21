// eslint-disable-next-line no-undef
require('./common');

describe('alarm', () => {
  it('should get user info', () => {
    cy.login();
    cy.visit('/profile');

    cy.intercept('http://localhost:5000/auth/me', {
      email: 'test@test.test',
      name: 'ivan',
      birthday: '2000-12-12',
      gender: 'Man',
    }).as('me');

    cy.wait('@me');
    cy.get('input[name="email"]').should('have.value', 'test@test.test');
    cy.get('input[name="name"]').should('have.value', 'ivan');
    cy.get('input[name="birthday"]').should('have.value', '2000-12-12');
    cy.get('input[name="gender"]').should('have.value', 'Man');
  });

  it('should update user info', () => {
    cy.get('input[name="name"]').type('ivan1');
    cy.get('input[name="birthday"]').type('2000-10-10');

    cy.intercept('POST', 'http://localhost:5000/auth/me', {
      email: 'test@test.test',
      name: 'ivanivan1',
      birthday: '2000-10-10',
      gender: 'Man',
    }).as('updateMe');

    cy.get('button[type="submit"]').click();

    cy.wait('@updateMe');

    cy.get('input[name="name"]').should('have.value', 'ivanivan1');
    cy.get('input[name="birthday"]').should('have.value', '2000-10-10');
  });
});
