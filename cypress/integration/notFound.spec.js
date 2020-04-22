/* eslint-disable no-loop-func */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable spaced-comment */
/* global context, beforeEach, cy, it, Cypress */

/// <reference types="cypress" />

context('Upload', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Should show 404 page if route is unknown', () => {
    cy.get('body').should('contain.text', 'colorange');

    cy.visit('http://localhost:3000/lol');

    cy.get('body').should(
      'contain.text',
      "Sorry, we can't find the page you were looking for.",
    );
  });

  it('Should allow user to go back', () => {
    cy.get('body').should('contain.text', 'colorange');

    cy.visit('http://localhost:3000/lol');

    cy.get('#back').click();

    cy.get('body').should('contain.text', 'Your phone is unorganized.');
  });

  it('Should display simple Nav', () => {
    cy.get('#nav').should('not.contain.text', 'How It Works');
    cy.get('#nav').should('not.contain.text', 'Log In');
  });
});
