import React from 'react'
import * as ReactDOM from 'react-dom/client'

// Refactor the div that we're mapping over to be a child component called CourseItem
// Be sure to pass all needed props down
// Be sure to move the key

let id = 4

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      courses: [
        { id: 1, name: 'HTML' },
        { id: 2, name: 'CSS' },
        { id: 3, name: 'JS' },
      ],
      input: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onRemoveItem = this.onRemoveItem.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const nextId = id++
    const newCourse = { id: nextId, name: this.state.input }
    this.setState({ courses: this.state.courses.concat(newCourse), input: '' })
  }

  onRemoveItem(courseId) {
    // const i = this.state.courses.findIndex((c) => c.id === courseId)
    // const len = this.state.courses.length
    // this.setState({
    //   courses: [...this.state.courses.slice(0, i), ...this.state.courses.slice(i + 1, len)],
    // })
    this.setState({
      courses: this.state.courses.filter((c) => {
        return c.id !== courseId
      }),
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.input}
            onChange={(e) => {
              this.setState({ input: e.target.value })
            }}
          />
          <button>Submit</button>
        </form>

        {this.state.courses.map((course) => {
          return (
            <CourseItem
              key={course.id}
              id={course.id}
              name={course.name}
              removeItem={this.onRemoveItem}
            />
          )
        })}
      </div>
    )
  }
}

function CourseItem({ name, id, removeItem }) {
  return (
    <div>
      {name}
      <button
        onClick={() => {
          removeItem(id)
        }}
      >
        Remove
      </button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
