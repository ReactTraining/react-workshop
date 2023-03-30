import * as ReactDOM from 'react-dom/client'
// import { BrowseCourses } from './BrowseCourses.final'
import { BrowseCourses } from './BrowseCourses'
// import { BlackBox } from './BlackBox'
import './styles.scss'

function App() {
  return (
    <div className="text-center">
      <BrowseCourses />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(<App />)
