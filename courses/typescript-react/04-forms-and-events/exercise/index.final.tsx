import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './Tabs'
import './styles.scss'

function App() {
  const [email, setEmail] = React.useState('')
  // obviously very secure here!
  const [password, setPassword] = React.useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    window.alert(`Security hack!!!! Your password is ${password}`)
  }

  return (
    <div className="spacing">
      <button className="button block">Start Focus Here</button>
      <Tabs>
        <TabList>
          <Tab>Events and Focus</Tab>
          <Tab>Login Form</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            Using your keyboard only, you should be able to move the focus in and out of the Tabs
            component and also change tabs in a way that the user would anticipate.
          </TabPanel>
          <TabPanel className="spacing">
            <form onSubmit={handleSubmit} autoComplete="off">
              <input
                type="email"
                placeholder="Email"
                aria-label="Email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                }}
                autoComplete="off"
              />
              <input
                type="password"
                placeholder="Password"
                aria-label="Password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                }}
                autoComplete="off"
              />
              <button className="button">Submit</button>
            </form>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <hr />
      <button className="button block">End Focus Here</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
