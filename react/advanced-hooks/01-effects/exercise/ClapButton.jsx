import { Component, useState, useEffect } from 'react'
import debounce from 'lodash.debounce'
import { saveClapsToDatabase } from './utils'

export class ClapButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      claps: 0,
      queueClaps: 0,
    }
    this.saveClaps = debounce(this.saveClaps, 1000)
  }

  saveClaps = () => {
    saveClapsToDatabase(this.state.queueClaps).then((latestClaps) => {
      this.setState({
        claps: latestClaps,
        queueClaps: 0,
      })
    })
  }

  clap = () => {
    this.setState((state) => {
      return { queueClaps: state.queueClaps + 1 }
    })
    this.saveClaps()
  }

  render() {
    return (
      <div className="text-center spacing">
        <button onClick={this.clap} className="button">
          Clap
        </button>
        <hr />
        <div className="horizontal-spacing">
          <span>Queue Claps: {this.state.queueClaps}</span>
          <span>Claps: {this.state.claps}</span>
        </div>
      </div>
    )
  }
}

// If you want to start from a function component instead of refactoring:

// function ClapButton() {
//   const [claps, setClaps] = useState(0)
//   const [queueClaps, setQueueClaps] = useState(0)

//   function clap() {
//   }

//   return (
//     <div className="text-center spacing">
//       <button onClick={clap} className="button">
//         Clap
//       </button>
//       <hr />
//       <div className="horizontal-spacing">
//         <span>Queue Claps: {queueClaps}</span>
//         <span>Claps: {claps}</span>
//       </div>
//     </div>
//   )
// }
