import React from 'react'
import ReactDOM from 'react-dom'
import 'workshop/styles/global-styles.scss'
import './styles.scss'

function App() {
  return (
    <div className="primary-layout">
      {/* <div>
        <PrimaryHeader />
        <Route path="/products" component={ProductSubNav} />
        <main className="primary-content">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/login" exact component={Login} />
            <Route path="/products" component={Products} />
            {cart.length > 0 && <Route path="/checkout" component={Checkout} />}
            {authenticated && <Route path="/account" component={Account} />}
            <Redirect to="/" />
          </Switch>
        </main>
        <PrimaryFooter />
      </div> */}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
