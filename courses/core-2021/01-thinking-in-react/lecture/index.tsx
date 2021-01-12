import React from 'react'
import ReactDOM from 'react-dom'
import { MdShoppingCart } from 'react-icons/md'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

type Props = {
  // icon: React.ElementType
  icon: React.ReactType
}

const App: React.FC<Props> = ({ icon: Icon }) => {
  return (
    <div>
      <Icon />
    </div>
  )
}

ReactDOM.render(<App icon={MdShoppingCart} />, document.getElementById('root'))
