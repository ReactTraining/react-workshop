import { ClientOne } from './client-one'
import { ServerTwo } from './server-two'

// https://www.joshwcomeau.com/react/server-components/
// https://x.com/lydiahallie/status/1655945218594844682
// https://react.dev/reference/rsc/use-client
// https://react.dev/reference/rsc/use-server
// https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#unsupported-pattern-importing-server-components-into-client-components
// The Good, Bad, Ugly: https://www.mayank.co/blog/react-server-components/

// Two ways to try using ServerTwo
// ✅ imported above the client boundary and passed as children
// ❌ imported below the client boundary

// The reason is because server components cannot be subjected to
// prop changes from client components. If a client comp had state
// and passed it as a prop to a server comp, how would that server
// comp "re-render" when it doesn't run on the client

// Server comp can "own" a client comp
// Server comp can own a server comp
// Client comp can own client comp
// Client comp CANNOT OWN server comp

export default function ServerOne() {
  return (
    <div className="bg-purple-200 p-4">
      <div>this is a server only component</div>
      <hr />
      <ClientOne>
        <ServerTwo />
      </ClientOne>
    </div>
  )
}
