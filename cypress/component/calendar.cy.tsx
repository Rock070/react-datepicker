/// <reference types="Cypress" />

import '@unocss/reset/tailwind.css'
import { theme } from 'unocss/preset-mini'
import random from '@/utils/random'
import getCalendar from '@/helpers/getCalendar'
import { MONTH_NAMES } from '@/helpers/const'
import rgbHex from 'rgb-hex'
import React from 'react'

import Datepicker, { disabledDate } from './datepicker'

import type { CalendarBtn } from '@/types'

beforeEach(() => {
  cy.mount(<Datepicker />)
})
describe('init state and render check', () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = MONTH_NAMES[today.getMonth()]
  const date = today.getDate()
  const calendar = getCalendar(today)

  it('mounts', () => {
    cy.get('[data-cy="mochi-calendar"]').should('exist')
  })

  it('check all date', () => {
    cy.get('[data-cy="mochi-calendar"] [data-cy="mochi-table-body"]').within(_ => {
      cy.wrap(calendar).each(item => {
        const cyDate = cy.get('[data-cy="mochi-calendar-date"]')
        const date = item as unknown as CalendarBtn
        if (!date?.time) return

        cyDate.should('contain.text', date.time.d)
      })
    })
  })

  it('check selected date value', () => {
    const cyHeader = cy.get('[data-cy="mochi-calendar"] [data-cy="mochi-table-header"]')
    cyHeader.should('contain', year)
    cyHeader.should('contain', month)

    cy.get('[data-cy="mochi-calendar"] [data-cy="mochi-table-body"]').within(_ => {
      cy.get('[data-cy="mochi-calendar-date"]')
        .contains(date)
        .should('have.class', 'mochi-bg-blue')
    })
  })

  it('check disabled style', () => {
    cy.get('[data-cy="mochi-calendar"] [data-cy="mochi-table-body"]').within(_ => {
      cy.wrap(calendar).each(item => {
        const cyDate = cy.get('[data-cy="mochi-calendar-date"]')
        const date = item as unknown as CalendarBtn
        if (!date?.time) return

        const disabled = disabledDate(date.value as any as Date)

        if (!disabled) return

        const regex = new RegExp(`^${date.time.d}$`)
        cyDate.contains(regex).should('have.class', 'mochi-calendar-disabled-date')
      })
    })
  })
})
describe('change date, then check state and render', () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const monthName = MONTH_NAMES[month]

  it('click every this month date and check', () => {
    cy.get('[data-cy="mochi-calendar"]').within(_ => {
      const cyDate = cy.get('[data-cy="mochi-calendar-date,mochi-calendar-this-month-date"]').not('.mochi-calendar-disabled-date')
      cyDate.each(el => {
        cy.wrap(el).click()
        const regex = new RegExp(`^${el.text()}$`)
        cyDate.get('.mochi-bg-blue').contains(regex)
      })
    })
  })

  it('check click disabled date', () => {

  })

  it('check click selected date', () => {

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
    cy.get('[data-cy="mochi-calendar"] [data-cy="mochi-table-header"]').should('contain', monthName)
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
    cy.get('[data-cy="mochi-calendar"] [data-cy="mochi-table-header"]').should('contain', monthName)
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

/**
 * - [ ] Hover 正常顯示「顏色」（disabled, selected, normal)
 * - [ ] 點擊隨機日期可以正常顯示「顏色」
 * - [ ] 點擊隨機切換月份正常顯示月份
 * - [ ] 點擊隨機切換年份正常顯示年份
 * - [ ] 點擊隨機切換十年份正常顯示十年份
 * - [ ] 點擊隨機切換百年份正常顯示百年份
 */

/**
 * - [ ] 確認本月日期是否正常
 * - [ ] 確認本月所有樣式（是否為此月、selected, disabled）
 * - [ ] 確認前後一個月日期是否正常
 * - [ ] 確認前後一個月所有樣式（是否為此月、selected, disabled）
 */
