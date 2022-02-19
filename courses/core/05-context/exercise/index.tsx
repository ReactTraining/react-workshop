import ReactDOM from 'react-dom'
import { BrowseCourses } from './BrowseCourses'
import { Counter } from './Counter'
import './styles.scss'

function App() {
  return <BrowseCourses />
}

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(<App />)
