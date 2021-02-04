import React from 'react'
import classnames from 'classnames'
import './Notice.scss'

type Props = {
  type?: 'error' | 'success'
}

export const Notice: React.FC<Props> = ({ children, type = 'default' }) => {
  return <div className={classnames(`notice notice-type-${type}`)}>{children}</div>
}
