import ReactDOM from 'react-dom'
// import { BrowseCourses } from './BrowseCourses.final'
// import { BrowseCourses } from './BrowseCourses'
import { Counter } from './Counter'
import './styles.scss'

function App() {
  return (
    <div className="text-center">
      <Counter />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(<App />)
