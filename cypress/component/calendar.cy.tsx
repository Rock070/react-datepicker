
import '@unocss/reset/tailwind.css'
import 'virtual:unocss-devtools'
import 'virtual:uno.css'

import React from 'react'

import Datepicker from './datepicker'

describe('<datepicker>', () => {
  it('mounts', () => {
    cy.mount(<Datepicker />)
    cy.get('span').should('have.text', '0')
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
