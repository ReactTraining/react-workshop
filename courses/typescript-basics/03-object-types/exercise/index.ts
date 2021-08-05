// These styles just make the lesson demos look a little nicer!
import 'YesterTech/styles/global-styles.scss'
import 'YesterTech/styles/center-lesson.scss'
import './styles.scss'

main()

function createTodoList() {
  const taskForm = document.querySelector<HTMLFormElement>('#task-form')
  const taskInput = document.querySelector<HTMLInputElement>('#task-input')
  // const addButton = document.querySelector<HTMLButtonElement>('#add-todo')
  const incompleteTasksList = document.querySelector<HTMLUListElement>('#incomplete-tasks')
  const completedTasksList = document.querySelector<HTMLUListElement>('#completed-tasks')

  taskForm.addEventListener('submit', addTask)
  for (let child of incompleteTasksList.children) {
    bindTaskEvents(child, taskCompleted)
  }

  for (let child of incompleteTasksList.children) {
    bindTaskEvents(child, taskIncomplete)
  }

  function createNewTaskElement(task) {
    // list item wrapper
    const listItemElem = document.createElement('li')
    listItemElem.className = 'task'
    if (task.complete) {
      listItemElem.classList.add('complete')
    }
    if (task.editMode) {
      listItemElem.classList.add('editing')
    }

    // list element form
    const form = document.createElement('form')

    // todo checkbox
    const checkBox = document.createElement('input')
    checkBox.id = slugify(task.label)
    checkBox.type = 'checkbox'
    checkBox.className = 'task-checkbox'
    if (task.complete) {
      checkBox.checked = true
    }

    // todo label
    const label = document.createElement('label')
    label.innerText = task.label
    label.htmlFor = checkBox.id
    label.className = 'task-label'
    if (task.editMode) {
      label.hidden = true
    }

    const editInput = document.createElement('input')
    editInput.type = 'text'
    editInput.value = task.label
    editInput.className = 'edit-input'
    if (!task.editMode) {
      editInput.disabled = true
      editInput.hidden = true
    }

    const editButton = document.createElement('button')
    editButton.innerText = task.editMode ? 'Save' : 'Edit'
    editButton.className = 'edit'
    editButton.type = task.editMode ? 'submit' : 'button'

    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'Delete'
    deleteButton.className = 'delete'
    deleteButton.type = 'button'

    listItemElem.appendChild(form)
    form.appendChild(checkBox)
    form.appendChild(label)
    form.appendChild(editInput)
    form.appendChild(editButton)
    form.appendChild(deleteButton)

    return listItemElem
  }

  function addTask(event: Event) {
    event.preventDefault()

    // Create a new list item with the text from the #task-input:
    let listItem = createNewTaskElement({
      label: taskInput.value,
      complete: false,
      editMode: false,
    })

    // Append listItem to incompleteTaskHolder
    incompleteTasksList.appendChild(listItem)
    bindTaskEvents(listItem, taskCompleted)

    // Reset task input and then focus it
    taskInput.value = ''
    taskInput.focus()
  }

  function isInEditMode({ listItem }) {
    return listItem.classList.contains('editing')
  }

  function enterEditMode({ label, listItem, editInput }) {
    let editButton = listItem.querySelector('button.edit')
    editInput.value = label.innerText
    label.hidden = true
    editInput.disabled = false
    editInput.hidden = false
    listItem.classList.add('editing')
    editButton.innerText = 'Save'
    editInput.focus()
  }

  function exitEditMode({ label, listItem, editInput }) {
    let editButton = listItem.querySelector('button.edit')
    label.innerText = editInput.value
    label.hidden = false
    editInput.disabled = true
    editInput.hidden = true
    listItem.classList.remove('editing')
    editButton.innerText = 'Edit'
  }

  function toggleEditMode({ listItem, label, editInput }) {
    let isCurrentlyEditing = isInEditMode({ listItem })
    console.log({ isCurrentlyEditing })

    if (isCurrentlyEditing) {
      exitEditMode({ listItem, label, editInput })
    } else {
      enterEditMode({ listItem, label, editInput })
    }
  }

  function editTask(listItem: HTMLElement) {
    let editInput = listItem.querySelector<HTMLInputElement>('input[type=text]')
    let label = listItem.querySelector<HTMLLabelElement>('label')
    toggleEditMode({ listItem, label, editInput })
  }

  function handleEditTaskClick() {
    let listItem: HTMLElement = this.parentNode.parentNode
    editTask.call(this, listItem)
  }

  function handleEditTaskSubmit(event: Event) {
    let listItem: HTMLElement = this.parentNode
    event.preventDefault()
    editTask.call(this, listItem)
  }

  function deleteTask() {
    let listItem: HTMLElement = this.parentNode.parentNode
    let ul = listItem.parentNode
    ul.removeChild(listItem)
  }

  function taskCompleted() {
    let listItem: HTMLElement = this.parentNode.parentNode
    completedTasksList.appendChild(listItem)
    bindTaskEvents(listItem, taskIncomplete)
    listItem.classList.add('complete')
  }

  function taskIncomplete() {
    let listItem: HTMLElement = this.parentNode.parentNode
    incompleteTasksList.appendChild(listItem)
    bindTaskEvents(listItem, taskCompleted)
    listItem.classList.remove('complete')
  }

  function bindTaskEvents(taskListItem: Element, checkBoxEventHandler) {
    let form = taskListItem.querySelector<HTMLFormElement>('form')
    let checkBox = taskListItem.querySelector<HTMLInputElement>('input[type="checkbox"]')
    let editButton = taskListItem.querySelector<HTMLButtonElement>('button.edit')
    let deleteButton = taskListItem.querySelector<HTMLButtonElement>('button.delete')

    if (editButton.innerText.toLowerCase() === 'edit') {
    } else {
      editButton.onclick = null
    }

    editButton.onclick = handleEditTaskClick
    form.onsubmit = handleEditTaskSubmit
    deleteButton.onclick = deleteTask
    checkBox.onchange = checkBoxEventHandler
  }
}

function main() {
  renderMarkup()
  createTodoList()
}

function renderMarkup() {
  let root = document.getElementById('root')
  root.innerHTML = getMarkup({ incompleteTodos: [], completeTodos: [] })
}

function getTodoMarkup({ editMode, complete, label }) {
  let id = slugify(label)
  return `
<li class="task${editMode ? ' editing' : ''}${complete ? ' complete' : ''}">
  <form>
    <input class="task-checkbox" id="${id}" type="checkbox"${complete ? ' checked=""' : ''} />
    <label class="task-label" for="${id}">${label}</label>
    <input class="edit-input" type="text"${editMode ? ' value="' + label + '" hidden' : ''} />
    <button class="edit" type="${editMode ? 'submit' : 'button'}">${
    editMode ? 'Save' : 'Edit'
  }</button>
    <button class="delete" type="button">Delete</button>
  </form>
</li>
`
}

function getMarkup({ incompleteTodos = [], completeTodos = [] }) {
  return `
<div class="container">
  <form class="task-form" id="task-form">
    <div>
      <label for="task-input">Add Todo</label>
      <input class="task-input" id="task-input" type="text" autocomplete="off" />
    </div>
    <button id="add-todo" class="add-button">Add</button>
  </form>

  <h3>Todo</h3>
  <ul class="task-list incomplete" id="incomplete-tasks">
    ${incompleteTodos.reduce((markup, todo) => {
      return markup + getTodoMarkup({ ...todo, complete: false })
    }, '')}
  </ul>

  <h3>Completed</h3>
  <ul class="task-list completed" id="completed-tasks">
    ${completeTodos.reduce((markup, todo) => {
      return markup + getTodoMarkup({ ...todo, complete: true })
    }, '')}
  </ul>
</div>
`
}

function slugify(str: string) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2') // get all lowercase letters that are near to uppercase ones
    .replace(/[\s_]+/g, '-') // replace all spaces and low dash
    .replace(/[^\w\s-]/, '')
    .toLowerCase()
}

interface Todo {
  editMode: boolean
  complete: boolean
  label: string
}
