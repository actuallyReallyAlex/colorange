/* eslint-disable no-loop-func */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable spaced-comment */
/* global context, beforeEach, cy, it, Cypress */

/// <reference types="cypress" />

context('About Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/about');
  });

  it('Should display about page', () => {
    cy.get('body').should(
      'contain.text',
      'Colorange is an opensource tool to help you organize your applications on your phone by color.',
    );
    cy.percySnapshot();
  });

  it('Should route to /app when CTA primary is clicked', () => {
    cy.get('#about-cta-primary').click();
    cy.get('#onboarding-primary-1').click();
    cy.get('#onboarding-primary-2').click();
    cy.get('#onboarding-primary-3').click();
    cy.get('body').should(
      'contain.text',
      'Upload a csv document to see the sorted applications',
    );
  });
});
