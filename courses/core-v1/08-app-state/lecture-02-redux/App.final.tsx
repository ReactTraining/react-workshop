import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { FavoriteProductProvider } from 'YesterTech/FavoriteProductState'
import PrimaryLayout from 'YesterTech/PrimaryLayout'
import { Provider } from 'react-redux'
import store from './store.final'
import 'YesterTech/styles/global-styles.scss'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <FavoriteProductProvider>
          <PrimaryLayout />
        </FavoriteProductProvider>
      </Provider>
    </BrowserRouter>
  )
}

export default App
