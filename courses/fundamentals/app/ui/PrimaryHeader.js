import React, { useState, useEffect } from 'react'
import { Columns, Column } from 'react-flex-columns'
import Avatar from 'workshop/Avatar'
import './PrimaryHeader.scss'

function PrimaryHeader() {
  const [userImage, setUserImage] = useState(null)

  useEffect(() => {
    fetch(`https://api.github.com/users/bradwestfall`)
      .then(res => res.json())
      .then(user => {
        setUserImage(user.avatar_url)
      })
  }, [])

  return (
    <Columns className="primary-header" split>
      <Column>header</Column>
      <Column>{userImage && <Avatar src={userImage} />}</Column>
    </Columns>
  )
}

export default PrimaryHeader
