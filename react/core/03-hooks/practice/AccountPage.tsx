import { useEffect, useState, useRef, memo, useMemo } from 'react'
import { renderMap } from '~/utils/maps'
import { Heading } from '~/Heading'
import { Counter } from './Counter'
import type { User } from './index'

/****************************************
  Account Page
*****************************************/

type Props = {
  user: User
}

export function AccountPage({ user }: Props) {
  const [count, setCount] = useState(0)

  const pos = { lat: 40.712, lng: -74.006 }

  return (
    <div className="space-y-3">
      <Heading>Account For User: {user.userId}</Heading>
      <p>You should only see this page if you're logged in</p>
      <hr />
      <p>
        Bonus Task: This counter is causing our maps component to re-render. This is NOT a problem
        but let's imagine it was and we wanted to stop the excessive re-renders. See the GUIDE.md
        for details
      </p>
      <Counter count={count} setCount={setCount} />
      <hr />
      <GoogleMaps pos={pos} />
    </div>
  )
}

/****************************************
  Google Maps Component
*****************************************/

type GoogleMapsProps = {
  pos: { lat: number; lng: number }
}

const GoogleMaps = ({ pos }: GoogleMapsProps) => {
  const mapRef = useRef<any>()
  const divRef = useRef<HTMLDivElement>(null!)

  console.log('GoogleMaps: Render')

  useEffect(() => {
    console.log('GoogleMaps: SideEffect')
    if (!mapRef.current) {
      renderMap(divRef.current, {
        center: pos,
        zoom: 10,
      }).then((map) => {
        mapRef.current = map
      })
    } else {
      mapRef.current.setCenter(pos)
    }
  }, [pos])

  return <div className="h-64 bg-slate-200" ref={divRef} />
}
