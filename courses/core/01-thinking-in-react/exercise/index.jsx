import * as ReactDOM from 'react-dom/client'
// import { BrowseCourses } from './BrowseCourses.final'
import { BrowseCourses } from './BrowseCourses'
import './styles.scss'

function App() {
  return <BrowseCourses />
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
