import React from 'react'
import cx from 'classnames'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
  onClick?: () => void
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
        'py-0.5 px-1 rounded-sm',
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
