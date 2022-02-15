import React from 'react'
import classnames from 'classnames'
import styles from './DataGrid.module.scss'

type DataGridProps = React.HTMLAttributes<HTMLDivElement>

export const DataGrid: React.FC<DataGridProps> = ({ children, className, ...rest }) => {
  return (
    <div {...rest} className={classnames(styles.dataGrid, className)} role="table">
      {children}
    </div>
  )
}

/**
 * Row
 */

type RowProps = React.HTMLAttributes<HTMLDivElement>

export const Row: React.FC<RowProps> = ({ children, className, ...props }) => {
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
} & React.HTMLAttributes<HTMLDivElement>

export const Col: React.FC<ColProps> = ({ children, width, flex = false, className, ...props }) => {
  return (
    <div
      {...props}
      className={classnames(styles.col, { 'data-grid-col-flex': flex }, className)}
      style={width ? { width } : undefined}
      role="col"
    >
      {children}
    </div>
  )
}
