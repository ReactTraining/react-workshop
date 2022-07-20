export function Heading({ as: El = 'h1', children, size = 1, ...props }) {
  return (
    <El {...props} className={`heading size-${size}`}>
      {children}
    </El>
  )
}

// const person = { name: 'brad', age: 89 }
// const personjob = { occupation: 'web' }

// const wholePerson = { person } //  { person: { name: 'brad', age: 89 } }
// const wholePerson = { ...person, ...personjob } //  { name: 'brad', age: 89, occupation: 'web }
