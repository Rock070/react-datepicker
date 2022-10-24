import React from 'react'
import cx from 'classNames'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
  onClick?: () => void
  children?: any
}

const BasicButton: React.FC<Props> = ({
  type = 'button',
  onClick = () => {},
  className = '',
  disabled = false,
  children
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cx(
        'py-1 px-2 rounded-sm',
        className,
        {
          'cursor-not-allowed pointer-events-none bg-gray-3': disabled,
          'hover:bg-gray-3': !disabled
        }
      )}
    >
      {children}
    </button>
  )
}

export default BasicButton
