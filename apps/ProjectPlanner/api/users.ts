import { post } from './utils'
import { getBoards, removeBoard, createBoard, createTaskGroup, createTask } from './boards'
import * as storage from '../localStorage'
import { User } from '../types'

type DatabaseUser = User & { password?: string }

export async function registerUser(user: Omit<User, 'id'>): Promise<User> {
  const newUser = await post<DatabaseUser>(`/users`, user)

  // Log them in (which we fake with localStorage)
  delete newUser.password
  storage.login(newUser)

  return newUser
}

/**
 * Seed an new account with data
 */

export async function resetAccountBoardData(userId: number) {
  try {
    const boards = await getBoards(userId)

    await Promise.all(
      boards.map((board) => {
        return removeBoard(board.id)
      })
    )

    const board = await createBoard(userId, 'React Workshop')

    const tg1 = await createTaskGroup(board.id, 'Getting Setup')
    await createTask(board.id, tg1.id, {
      name: 'JS Primer Article',
      content: 'Remember to read: https://reacttraining.com/blog/javascript-the-react-parts/',
      minutes: 10,
      completedMinutes: 10,
      assignedTo: [userId],
    })
    await createTask(board.id, tg1.id, {
      name: 'Install Workshop Code',
      content: 'git clone and npm install',
      minutes: 5,
      completedMinutes: 5,
      assignedTo: [userId],
    })

    const tg2 = await createTaskGroup(board.id, 'Thinking in React')
    await createTask(board.id, tg2.id, {
      name: 'Declarative vs Imperative',
      content:
        'Declarative code is when you write in a style where you say "what" you want, like HTML, CSS, SQL, or React\'s JSX. Imperative code is when you write in a style where you say "how" you want things to work.',
      minutes: 60,
    })
    await createTask(board.id, tg2.id, {
      name: 'Creating State',
      content: 'State can be created with useState or useReducer',
      minutes: 60,
    })
    await createTask(board.id, tg2.id, {
      name: 'Updating State',
      content: 'Updating state will cause a re-render of the component',
      minutes: 10,
      completedMinutes: 5,
    })

    const tg3 = await createTaskGroup(board.id, 'Terminology')
    await createTask(board.id, tg3.id, {
      name: 'React Component',
      content:
        'React components are created with functions or classes. With functions, they return JSX. With classes, the `render` method returns JSX',
      minutes: 10,
      completedMinutes: 5,
    })
    await createTask(board.id, tg3.id, {
      name: 'SPA',
      content:
        'A "Single Page Application" is where the HTML payload is only delivered on the first request. Then JavaScript mimics page changes and updates the URL as the user navigates. The DOM is also changed between pages giving an impression of real page changes.',
      minutes: 10,
      completedMinutes: 10,
    })
  } catch (err) {
    console.log('Error Creating User Data', err)
  }
}
