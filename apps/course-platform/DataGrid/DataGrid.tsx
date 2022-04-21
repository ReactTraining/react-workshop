import React from 'react'
import classnames from 'classnames'
import styles from './DataGrid.module.scss'

type ChildrenProps = { children: React.ReactNode }
type DataGridProps = ChildrenProps & React.HTMLAttributes<HTMLDivElement>

export function DataGrid({ children, className, ...rest }: DataGridProps) {
  return (
    <div {...rest} className={classnames(styles.dataGrid, className)} role="table">
      {children}
    </div>
  )
}

/**
 * Row
 */

type RowProps = ChildrenProps & React.HTMLAttributes<HTMLDivElement>

export function Row({ children, className, ...props }: RowProps) {
  return (
    <div {...props} className={classnames(styles.row, className)} role="row">
      {children}
    </div>
  )
}

/**
 * Col
 */

type ColProps = {
  width?: number
  flex?: boolean
} & ChildrenProps &
  React.HTMLAttributes<HTMLDivElement>

export function Col({ children, width, flex = false, className, ...props }: ColProps) {
  return (
    <div
      {...props}
      className={classnames(styles.col, { 'data-grid-col-flex': flex }, className)}
      style={width ? { width } : undefined}
      role="cell"
    >
      {children}
    </div>
  )
}
