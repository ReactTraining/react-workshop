import React from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { Centered } from 'ProjectPlanner/Centered'
import { Tiles } from 'ProjectPlanner/Tiles'

export const Dashboard: React.FC = () => {
  return (
    <Centered size={50}>
      <div className="flex">
        <div className="flex-1 spacing">
          <Fake className="p-2 spacing">
            <Heading>Dashboard</Heading>
          </Fake>

          <Tiles minSize={9}>
            <Fake className="h-25" />
            <Fake className="h-25" />
            <Fake className="h-25" />
          </Tiles>
          <div className="spacing">
            <Fake className="p-2">
              <div className="flex">
                <div className="mr-4">
                  <Fake className="w-20 h-20" />
                </div>
                <div className="flex-1">
                  <Fake className="h-20" />
                </div>
              </div>
            </Fake>
            <Fake className="p-2">
              <div className="flex">
                <div className="mr-4">
                  <Fake className="w-20 h-20" />
                </div>
                <div className="flex-1">
                  <Fake className="h-20" />
                </div>
              </div>
            </Fake>
          </div>
        </div>
        <aside className="ml-4 w-60 spacing-large">
          <div className="spacing-small">
            <Fake />
            <Fake />
            <Fake />
          </div>
          <div className="spacing-small">
            <Fake />
            <Fake />
            <Fake />
          </div>
          <Tiles minSize={3}>
            <Fake className="h-12" />
            <Fake className="h-12" />
            <Fake className="h-12" />
            <Fake className="h-12" />
            <Fake className="h-12" />
            <Fake className="h-12" />
            <Fake className="h-12" />
            <Fake className="h-12" />
          </Tiles>
        </aside>
      </div>
    </Centered>
  )
}

type Props = { className?: string }
const Fake: React.FC<Props> = ({ children, className }) => {
  return <div className={`fake-content ${className}`} children={children} />
}
