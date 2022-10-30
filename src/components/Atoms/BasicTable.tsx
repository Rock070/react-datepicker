import React, { ReactNode } from 'react'

interface Props {
  children: {
    header?: ReactNode
    body: ReactNode
  }
}

const basicTable: React.FC<Props> = ({ children }) => {
  return (
    <table width="100%" cellPadding="0">
      <thead>
        { children.header }
      </thead>
      <tbody>
        { children.body }
      </tbody>
    </table>
  )
}

export default basicTable
