import React from 'react'
import cx from 'classnames'

interface Props {
  dataCy?: string
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
  onClick?: () => void
  children?: any
}

const BasicButton: React.FC<Props> = ({
  dataCy = '',
  type = 'button',
  onClick = () => {},
  className = '',
  disabled = false,
  children = ''
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      data-cy={dataCy}
      className={cx(
        'mochi-py-0.5 mochi-px-1 mochi-rounded-sm',
        className,
        {
          'calendar-disabled-date': disabled,
          'mochi-hover:bg-gray-2': !disabled
        }
      )}
    >
      {children}
    </button>
  )
}

export default BasicButton
