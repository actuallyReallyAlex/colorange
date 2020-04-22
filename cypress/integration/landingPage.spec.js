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

  it('Should route to app', () => {
    cy.get('body').should('contain.text', 'colorange');

    cy.get('#cta').click();

    cy.get('body').should(
      'contain.text',
      'Upload a csv document to see the sorted applications',
    );
  });

  it('Should display full Nav', () => {
    cy.get('body').should('contain.text', 'How It Works');
    cy.get('body').should('contain.text', 'Login');
  });
});
