import * as ReactDOM from 'react-dom/client'
import { Heading } from '~/Heading'
import { Icon } from '~/Icon'
import { Lesson } from '~/Lesson'
import { LoginForm } from './LoginForm'

function App() {
  return (
    <Lesson>
      <div className="flex gap-28">
        <section className="space-y-6">
          <Heading>Counter</Heading>
          <button className="button">
            <Icon name="minus" />
          </button>
          <span className="align-middle text-3xl px-6">0</span>
          <button className="button">
            <Icon name="plus" />
          </button>
        </section>
        <section className="flex-1 space-y-6">
          <Heading>Login Form</Heading>
          <LoginForm onSubmit={() => {}} />
        </section>
        <section className="s w-96">
          <div className="bg-slate-100">list</div>
        </section>
      </div>
    </Lesson>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
