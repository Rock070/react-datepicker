/// <reference types="Cypress" />

import '@unocss/reset/tailwind.css'
import { theme } from 'unocss/preset-mini'
import rgbHex from 'rgb-hex'
import React from 'react'

import Datepicker from './datepicker'

export const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

describe('<datepicker>', () => {
  const today = new Date()
  it('mounts', () => {
    cy.mount(<Datepicker />)
    cy.get('[data-cy="mochi-calendar"]').should('exist')
  })

  it('check initial date value and selected date style', () => {
    cy.mount(<Datepicker />)
    const year = today.getFullYear()
    const month = MONTH_NAMES[today.getMonth()]
    const date = today.getDate()
    cy.get('[data-cy="mochi-calendar"] [data-cy="mochi-table-header"]').should('contain', year)
    cy.get('[data-cy="mochi-calendar"] [data-cy="mochi-table-header"]').should('contain', month)
    cy.get('[data-cy="mochi-calendar"] [data-cy="mochi-table-body"] [data-cy="mochi-calendar-date"]')
      .contains(date)
      .should('have.class', 'mochi-bg-blue')
  })

  it('check click date', () => {
    cy.mount(<Datepicker />)
    const year = today.getFullYear()
    const month = MONTH_NAMES[today.getMonth()]

    cy.get('[data-cy="mochi-calendar"] [data-cy="mochi-table-body"] [data-cy="mochi-calendar-date"]')
      .contains('10')
      .click()
    cy.get('[data-cy="mochi-calendar"] [data-cy="mochi-table-header"]').should('contain', year)
    cy.get('[data-cy="mochi-calendar"] [data-cy="mochi-table-header"]').should('contain', month)
    cy.get('[data-cy="mochi-calendar"] [data-cy="mochi-table-body"] [data-cy="mochi-calendar-date"]')
      .contains('10')
      .should('have.class', 'mochi-bg-blue')
  })

  // https://github.com/cypress-io/cypress/issues/10#issuecomment-731839616
  it('check hover date', () => {
    cy.mount(<Datepicker />)
    const dateEl = cy.get('[data-cy="mochi-calendar"] [data-cy="mochi-table-body"] [data-cy="mochi-calendar-date"]')

    dateEl.contains('13').realHover()
    const color = (theme as any).colors.gray['2'].replace('#', '') as string
    dateEl.contains('13')
      .invoke('css', 'background-color')
      .then(bgColor => {
        expect(rgbHex(bgColor as any as string)).eq(color)
      })
  })

  it('test', () => {
    cy.intercept('/sponsors', { name: 'rock' })
  })
})

/**
 * Hover 正常顯示「顏色」
 * 點擊日期可以正常顯示「顏色」
 * 點擊切換月份正常顯示月份
 * 點擊切換年份正常顯示年份
 * 點擊切換十年份正常顯示十年份
 * 點擊切換百年份正常顯示百年份
 */
