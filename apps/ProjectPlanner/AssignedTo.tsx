import React from 'react'
import { Avatar } from 'ProjectPlanner/Avatar'

type Props = {
  taskId: number
}

export const AssignedTo: React.FC<Props> = ({ taskId }) => {
  return (
    <div className="avatar-group">
      <Avatar src={'https://avatars3.githubusercontent.com/u/2272118?v=4'} size={2} />
      <Avatar src={'https://avatars3.githubusercontent.com/u/2272118?v=4'} size={2} />
      <Avatar src={'https://avatars3.githubusercontent.com/u/2272118?v=4'} size={2} />
      <Avatar src={'https://avatars3.githubusercontent.com/u/2272118?v=4'} size={2} />
    </div>
  )
}
