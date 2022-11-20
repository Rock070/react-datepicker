import React from 'react'
import cx from 'classnames'

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
  children = ''
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cx(
        'mochi-py-0.5 mochi-px-1 mochi-rounded-sm',
        className,
        {
          'mochi-cursor-not-allowed mochi-pointer-events-none mochi-bg-gray-3': disabled,
          'mochi-hover:bg-gray-2': !disabled
        }
      )}
    >
      {children}
    </button>
  )
}

export default BasicButton
