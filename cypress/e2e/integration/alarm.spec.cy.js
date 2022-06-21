// eslint-disable-next-line no-undef
require('./common');

describe('alarm', () => {
  it('should add alarm', () => {
    cy.login();
    cy.intercept('GET', 'http://localhost:5000/alarm', []).as('alarms');
    cy.wait('@alarms');

    cy.intercept('POST', 'http://localhost:5000/alarm', {
      id: '1',
      active: false,
      time: '00:00:00',
    }).as('addAlarm');

    cy.get('button').contains('Add New Alarm').click();
    cy.wait('@addAlarm');

    cy.get('div[data-testid="alarm-container"]').should('exist');
  });

  it('should update alarm active', () => {
    cy.intercept('PUT', 'http://localhost:5000/alarm', {
      time: '00:00:00',
      active: true,
      id: '1',
    }).as('updateAlarm');
    cy.get('input[type="checkbox"]').click();

    cy.wait('@updateAlarm');
  });
  it('should update alarm time', () => {
    cy.intercept('PUT', 'http://localhost:5000/alarm', {
      time: '10:10:10',
      active: true,
      id: '1',
    }).as('updateAlarm');
    cy.get('input[type="time"]').type('10:10:10');
    cy.wait('@updateAlarm');
  });

  it('should delete alarm', () => {
    cy.intercept('DELETE', 'http://localhost:5000/alarm/1', {}).as(
      'deleteAlarm'
    );

    cy.get('button[data-testid="alarm-delete"]').click();

    cy.wait('@deleteAlarm');

    cy.get('div[data-testid="alarm-container"]').should('not.exist');
  });
});
