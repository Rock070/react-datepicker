
import '@unocss/reset/tailwind.css'
import 'virtual:unocss-devtools'
import 'virtual:uno.css'

import React from 'react'

import Stepper from '../../src/components/Stepper'
import OrgCalendar from '../../src/components/Organisms/OrgCalendar'

// describe('<Stepper>', () => {
//   it('mounts', () => {
//     cy.mount(<Stepper />)
//   })
// })

describe('<OrgCalendar>', () => {
  it('mounts', () => {
    cy.mount(<OrgCalendar />)
  })
})
