import React from 'react'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  className?: string
  onClick?: () => void
  children?: any
}

export default function BasicButton ({
  type = 'button',
  onClick = () => {},
  className = '',
  children = ''
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={
      `
        py-1 px-2
        rounded-sm
        hover:bg-gray-3
        ${className}
      `}
    >
      {children}
    </button>
  )
}
