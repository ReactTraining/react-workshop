# Notes for Instructor

We like React because:

1. It's declarative
2. It's composable

All React needs to render is a DOM element, and a React element:

```jsx
const reactElement = <div>Heyooooooo</div>
const domElement = document.getElementById('root')

// and away we go!
ReactDOM.render(reactElement, domElement)
```

This HTML-looking syntax in JavaScript is called JSX, and it's special to React, but it's not that special. We’ve got a build setup that uses a tool called "babel" that converts it to 1-to-1 function calls.

```jsx
// Instead of having babel do it, let's do it ourselves

const reactElement = React.createElement('div', null, 'Heyooooooo')
const domElement = document.getElementById('root')

// and away we go!
ReactDOM.render(reactElement, domElement)
```

The first argument is the type, the second is the attributes, but we call them `props` in React (we’ll get back to that) and the rest of the arguments are the children.

```jsx
const reactElement = React.createElement(
  'button',
  { className: 'render_button' },
  '+'
)
const domElement = document.getElementById('root')

ReactDOM.render(reactElement, domElement)
```

Children can be more than text, just like in HTML, you can have more than text as your children, and you can have multiple children.

```jsx
const reactElement = React.createElement(
  'button',
  { className: 'render_button' },
  '+',
  React.createElement(
    'span',
    { style: { fontWeight: 'bold', marginLeft: '5px' } },
    'Add'
  )
)

const domElement = document.getElementById('root')
ReactDOM.render(reactElement, domElement)
```

Since it's all Just JavaScript™, we can use variables to render

```jsx
const title = 'Add'
const reactElement = React.createElement(
  'button',
  { className: 'render_button' },
  '+',
  React.createElement(
    'span',
    { style: { fontWeight: 'bold', marginLeft: '5px' } },
    title
  )
)

const domElement = document.getElementById('root')
ReactDOM.render(reactElement, domElement)
```

Let's put this back into JSX. To jump out of JSX Land into JS Land, you use curlies ({}). Inside the curlies is Just JavaScript™. Don't think about a "template placeholder", think about a argument to a function (like we just saw). Any JS expression can go there, because it is a JS expression.

```jsx
const getTitle = () => 'Add'
const reactElement = (
  <button className="render_button">
    {' '}
    +<span style={{ fontWeight: 'bold', marginLeft: '5px' }}>
      {getTitle()}
    </span>
  </button>
)

const domElement = document.getElementById('root')
ReactDOM.render(reactElement, domElement)
```

Now, check this out, you can wrap up a bunch of elements inside of what's called a "component" like <FaStar/>. That thing is a ton of SVG.

```jsx
const getTitle = () => 'Add'
const reactElement = (
  <button className="render_button">
    <FaStar />
    <span style={{ fontWeight: 'bold', marginLeft: '5px' }}>
      {getTitle()}
    </span>
  </button>
)

const domElement = document.getElementById('root')
ReactDOM.render(reactElement, domElement)
```

Let's turn our button into a component and remove some stuff:

```jsx
const Button = () => (
  <button className="render_button">
    <FaStar />
    <span>Add</span>
  </button>
)

const domElement = document.getElementById('root')
ReactDOM.render(<Button />, domElement)
```

One thing that makes components great is that they're reusable, they are the foundation of composition in React. This button always renders the same stuff inside, but if we use the props that get passed in, we can use it in multiple contexts.

```jsx
function Button(props) {
  return <button className="render_button">{props.children}</button>
}

function App() {
  return (
    <div>
      <Button>
        <FaStar /> Add
      </Button>
      <Button>
        <FaRegStar /> Subtract
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```
