/// <reference types="cypress" />
import { mount } from 'cypress/react'
import 'cypress-real-events'
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      mount: typeof mount
      /**
         * Custom command to select DOM element by data-cy attribute.
         * @example cy.dataCy('greeting')
         */
      dataCy: (value: string) => Chainable<JQuery<HTMLElement>>

      /**
         * Custom command to select DOM element by data-test-id attribute.
         * @example cy.testId('greeting')
         */
      testId: (value: string) => Chainable<JQuery<HTMLElement>>

    }
  }
}
