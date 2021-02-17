import * as React from 'react'
import classnames from 'classnames'

import 'YesterTech/Notice.scss'

interface NoticeProps {
  type?: 'default' | 'error' | 'success'
}

const Notice: React.FC<NoticeProps> = ({ children, type = 'default' }) => (
  <div className={classnames('notice', `notice-type-${type}`)}>{children}</div>
)

export default Notice
