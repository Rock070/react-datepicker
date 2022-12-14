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
      <thead data-cy="mochi-table-header">
        { children.header }
      </thead>
      <tbody data-cy="mochi-table-body">
        { children.body }
      </tbody>
    </table>
  )
}

export default basicTable
