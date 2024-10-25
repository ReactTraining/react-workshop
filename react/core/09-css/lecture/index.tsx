import * as ReactDOM from 'react-dom/client'
import './styles.css'

function App() {
  return (
    <div className="w-full">
      <div className="bg-red-600">Hello</div>
      <div className="bg-blue-600">world</div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
