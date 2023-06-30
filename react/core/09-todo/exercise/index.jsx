import React, { useState } from 'react'
import * as ReactDOM from 'react-dom/client'
import { FaTrash } from 'react-icons/fa'
import { Formik, Form, Field } from 'formik'
import './styles.scss'
import { TodoItemListing } from './TodoItemListing'

function App() {
  const [data, setData] = useState([
    { id: 1, name: 'Wake up, brush my teeth' },
    { id: 2, name: 'eat food' },
  ])

  return (
    <div>
      <Formik
        onSubmit={(values) => {
          // setData(data.concat(values))
          const id = data.length + 1
          setData([...data, { id, name: values.name }])
        }}
        initialValues={{ name: '' }}
      >
        <Form>
          <Field type="text" name="name" />
          <button type="submit" className="button">
            Submit
          </button>
        </Form>
      </Formik>
      <hr />
      {data.map((item) => {
        return (
          <TodoItemListing
            onRemove={(id) => {
              console.log(id)
            }}
            key={item.id}
            name={item.name}
            id={item.id}
          />
        )
      })}
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
