/* eslint-disable no-loop-func */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable spaced-comment */
/* global context, beforeEach, cy, it, Cypress */

/// <reference types="cypress" />

context('Landing Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Should route to app', () => {
    cy.get('body').should('contain.text', 'colorange');

    cy.get('#cta').click();
    cy.get('#onboarding-primary-1').click();
    cy.get('#onboarding-primary-2').click();
    cy.get('#onboarding-primary-3').click();
    cy.get('body').should(
      'contain.text',
      'Upload a csv document to see the sorted applications',
    );
  });

  it('Should route to About Page', () => {
    cy.get('body').should('contain.text', 'colorange');

    cy.get('#nav-about').click();

    cy.get('body').should(
      'contain.text',
      'Colorange is an opensource tool to help you organize your applications on your phone by color.',
    );
  });

  it('Should display full Nav', () => {
    cy.get('#nav').should('contain.text', 'How It Works');
    // cy.get('#nav').should('contain.text', 'Log In');
  });
});
