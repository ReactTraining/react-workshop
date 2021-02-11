import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect, Link, useParams } from 'react-router-dom'
import { PrimaryHeader } from 'ProjectPlanner/PrimaryHeaderStub'
import { PrimaryFooter } from 'ProjectPlanner/PrimaryFooter'
import { Centered } from 'ProjectPlanner/Centered'
import { BsKanban } from 'react-icons/bs'
import { Heading } from 'ProjectPlanner/Heading'
import { useBoards } from 'ProjectPlanner/hooks/dataHooks'
import 'ProjectPlanner/styles/global-styles.scss'
import 'ProjectPlanner/PrimaryLayout.scss'
import 'ProjectPlanner/BrowseBoardItem.scss'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <PrimaryLayout />
    </BrowserRouter>
  )
}

const PrimaryLayout: React.FC = () => {
  return (
    <div className="primary-layout">
      <PrimaryHeader />
      <main className="primary-content">
        <Dashboard />
      </main>
      <PrimaryFooter />
    </div>
  )
}

const Dashboard: React.FC = () => {
  return (
    <Centered size={50}>
      <Heading>Welcome to your Dashboard</Heading>
    </Centered>
  )
}

const BrowseBoards: React.FC = () => {
  const boards = useBoards()

  return (
    <Centered size={50}>
      <Heading>Boards</Heading>

      <div className="spacing">
        {boards &&
          boards.map((board) => {
            return (
              <div key={board.id} className="browse-board-item flex items-center">
                <div className=" mr-4" style={{ fontSize: '2rem' }}>
                  <BsKanban className="block" color="#696ad8" />
                </div>
                <div className="spacing-small flex-1">
                  <Heading>
                    <Link to={`/boards/${board.id}`}>{board.name || <em>Board Name</em>}</Link>
                  </Heading>
                </div>
              </div>
            )
          })}
      </div>
    </Centered>
  )
}

const Board: React.FC = () => {
  const { boardId } = useParams<{ boardId: string }>()

  return (
    <Centered size={50}>
      <Heading>👋 Hi from board {boardId}</Heading>
    </Centered>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
