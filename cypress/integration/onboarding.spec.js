/* eslint-disable no-loop-func */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable spaced-comment */
/* global context, beforeEach, cy, it, Cypress */

/// <reference types="cypress" />

context('About Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('#cta').click();
  });

  it('Should display onboarding if user is new.', () => {
    cy.get('body').should('contain.text', 'Install Apple Configurator 2');
  });

  it('Should have user go through onboarding.', () => {
    cy.get('#onboarding-primary-1').click();
    cy.get('body').should(
      'contain.text',
      'Open Apple Configurator 2 and connect your phone via USB cable.',
    );

    cy.get('#onboarding-primary-2').click();
    cy.get('body').should(
      'contain.text',
      'Continue on to upload your exported application list to Colorange.',
    );

    cy.get('#onboarding-primary-3').click();
    cy.get('body').should(
      'contain.text',
      'Upload a csv document to see the sorted applications',
    );
  });
});
