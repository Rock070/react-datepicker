/// <reference types="Cypress" />

import '@unocss/reset/tailwind.css'
import { theme } from 'unocss/preset-mini'
import rgbHex from 'rgb-hex'
import React from 'react'

import Datepicker from './datepicker'

export const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

describe('<datepicker>', () => {
  beforeEach(() => {
    cy.mount(<Datepicker />)
  })
  const today = new Date()
  const year = today.getFullYear()
  const month = MONTH_NAMES[today.getMonth()]
  const date = today.getDate()

  it('mounts', () => {
    cy.get('[data-cy="mochi-calendar"]').should('exist')
  })

  it('check initial date value and selected date style', () => {
    cy.get('[data-cy="mochi-calendar"] [data-cy="mochi-table-header"]').should('contain', year)
    cy.get('[data-cy="mochi-calendar"] [data-cy="mochi-table-header"]').should('contain', month)
    cy.get('[data-cy="mochi-calendar"] [data-cy="mochi-table-body"] [data-cy="mochi-calendar-date"]')
      .contains(date)
      .should('have.class', 'mochi-bg-blue')
  })

  it('check click date', () => {
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
    const dateEl = cy.get('[data-cy="mochi-calendar"] [data-cy="mochi-table-body"] [data-cy="mochi-calendar-date"]')

    dateEl.contains('13').realHover()
    const color = (theme as any).colors.gray['2'].replace('#', '') as string
    // https://stackoverflow.com/questions/70740557/cypress-check-color-of-css-background
    dateEl.contains('13')
      .invoke('css', 'background-color')
      .then(bgColor => {
        expect(rgbHex(bgColor as any as string)).eq(color)
      })
  })

  // TODO: 優化為自動計算區間，並亂數選取
  it('change month', () => {
    const rangeBtn = cy.get('[data-cy="mochi-calendar-range-btn"]')
    rangeBtn.click()
    const monthBtn = cy.get('[data-cy="mochi-calendar-month-btn"]')
    // March
    const MARCH = MONTH_NAMES[2]
    monthBtn.contains(MARCH).click()

    cy.get('[data-cy="mochi-calendar"] [data-cy="mochi-table-body"] [data-cy="mochi-calendar-date"]')
      .contains('10')
      .click()
    cy.get('[data-cy="mochi-calendar"] [data-cy="mochi-table-header"]').should('contain', year)
    cy.get('[data-cy="mochi-calendar"] [data-cy="mochi-table-header"]').should('contain', MARCH)
    cy.get('[data-cy="mochi-calendar"] [data-cy="mochi-table-body"] [data-cy="mochi-calendar-date"]')
      .contains('10')
      .should('have.class', 'mochi-bg-blue')
  })
  // TODO: 優化為自動計算區間，並亂數選取
  it('change year', () => {
    const dateRangeBtn = cy.get('[data-cy="mochi-calendar-range-btn"]')
    dateRangeBtn.click()
    const monthRangeBtn = cy.get('[data-cy="mochi-calendar-range-btn"]')
    monthRangeBtn.click()
    const yearBtn = cy.get('[data-cy="mochi-calendar-year-btn"]')
    const YEAR = 2029
    yearBtn.contains(YEAR).click()

    const monthBtn = cy.get('[data-cy="mochi-calendar-month-btn"]')
    monthBtn.contains(month).click()

    cy.get('[data-cy="mochi-calendar"] [data-cy="mochi-table-body"] [data-cy="mochi-calendar-date"]')
      .contains('10')
      .click()
    cy.get('[data-cy="mochi-calendar"] [data-cy="mochi-table-header"]').should('contain', YEAR)
    cy.get('[data-cy="mochi-calendar"] [data-cy="mochi-table-header"]').should('contain', month)
    cy.get('[data-cy="mochi-calendar"] [data-cy="mochi-table-body"] [data-cy="mochi-calendar-date"]')
      .contains('10')
      .should('have.class', 'mochi-bg-blue')
  })

  // TODO: 優化為自動計算區間，並亂數選取
  it('change decade', () => {
    const dateRangeBtn = cy.get('[data-cy="mochi-calendar-range-btn"]')
    dateRangeBtn.click()
    const monthRangeBtn = cy.get('[data-cy="mochi-calendar-range-btn"]')
    monthRangeBtn.click()
    const yearRangeBtn = cy.get('[data-cy="mochi-calendar-range-btn"]')
    yearRangeBtn.click()

    const decadeBtn = cy.get('[data-cy="mochi-calendar-decade-btn"]')
    const DECADE = '2031 - 2040'
    decadeBtn.contains(DECADE).click()

    const yearBtn = cy.get('[data-cy="mochi-calendar-year-btn"]')
    const YEAR = 2032
    yearBtn.contains(YEAR).click()

    const monthBtn = cy.get('[data-cy="mochi-calendar-month-btn"]')
    monthBtn.contains(month).click()

    cy.get('[data-cy="mochi-calendar"] [data-cy="mochi-table-body"] [data-cy="mochi-calendar-date"]')
      .contains('10')
      .click()
    cy.get('[data-cy="mochi-calendar"] [data-cy="mochi-table-header"]').should('contain', YEAR)
    cy.get('[data-cy="mochi-calendar"] [data-cy="mochi-table-header"]').should('contain', month)
    cy.get('[data-cy="mochi-calendar"] [data-cy="mochi-table-body"] [data-cy="mochi-calendar-date"]')
      .contains('10')
      .should('have.class', 'mochi-bg-blue')
  })
})

/**
 * - [x] Hover 正常顯示「顏色」
 * - [x] 點擊日期可以正常顯示「顏色」
 * - [x] 點擊切換月份正常顯示月份
 * - [x] 點擊切換年份正常顯示年份
 * - [x] 點擊切換十年份正常顯示十年份
 * - [x] 點擊切換百年份正常顯示百年份
 */
