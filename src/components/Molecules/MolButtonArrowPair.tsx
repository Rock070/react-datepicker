import React from 'react'

import { Icon } from '@iconify/react'

import BasicButton from '@/components/Atoms/BasicButton'

type Handler = (...arg: any[]) => any

interface Props {
  displayTitle: string
  titleDisabled?: boolean
  displayTitleHandler?: Handler
  isDoubleArrow?: boolean
  handler?: {
    left?: Handler
    doubleLeft?: Handler
    right?: Handler
    doubleRight?: Handler
  }
}

const MolButtonArrowPair: React.FC<Props> = props => {
  const { isDoubleArrow, handler, displayTitle, displayTitleHandler, titleDisabled } = props

  return (
    <div className="mochi-flex mochi-justify-between mochi-items-center">
      <div>
        {
          isDoubleArrow &&
            <BasicButton onClick={handler?.doubleLeft}>
              <Icon icon="ant-design:double-left-outlined" />
            </BasicButton>
        }
        <BasicButton onClick={handler?.left}>
          <Icon icon="akar-icons:chevron-left" />
        </BasicButton>
      </div>
      <BasicButton dataCy="mochi-calendar-range-btn" onClick={displayTitleHandler} disabled={titleDisabled}>{displayTitle}</BasicButton>
      <div>
        <BasicButton onClick={handler?.right}>
          <Icon icon="akar-icons:chevron-right" />
        </BasicButton>
        {
          isDoubleArrow &&
            <BasicButton onClick={handler?.doubleRight}>
              <Icon icon="ant-design:double-right-outlined" />
            </BasicButton>
        }
      </div>
    </div>
  )
}

export default MolButtonArrowPair
