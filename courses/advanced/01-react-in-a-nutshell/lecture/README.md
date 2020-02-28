# Fundamentals in an Hour

## Rendering

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

You probably know that this syntax is called JSX. If we don't like JSX, it's
Just JavaScript™ under the hood:

```jsx
// Instead of having babel do it, let's do it ourselves

const reactElement = React.createElement('div', null, 'Heyooooooo')
const domElement = document.getElementById('root')

// and away we go!
ReactDOM.render(reactElement, domElement)
```

And you can nest functions in there, get abstract, do whatever JS lets you do.

Let's turn this into a button, and go back to JSX.

```jsx
const button = <button>Submit</button>

const domElement = document.getElementById('root')
ReactDOM.render(button, domElement)
```

Now, the key thing to remember here is that we've created an `element`. An
element is an object returned from a function call. If we want to turn this into
a `component` that's reusable and can take in props, we make this into a
function:

```jsx
const Button = () => (
  <button className="render_button">
    <span>Submit</span>
  </button>
)

const domElement = document.getElementById('root')
ReactDOM.render(<Button />, domElement)
```

And then you can pass props in to that function:

```jsx
const Button = ({ text }) => (
  <button className="render_button">
    <span>{text}</span>
  </button>
)

const domElement = document.getElementById('root')
ReactDOM.render(<Button text={'Submit'} />, domElement)
```

One thing that makes components great is that they're reusable, they are the
foundation of composition in React. This button always renders the same stuff
inside, but if we use the props that get passed in, we can use it in multiple
contexts.

## State

Let's say we have a component called Pokemon, where we currently render just
a simple `<div>` with a variable thrown in.

```jsx
function Pokemon() {
  let pokémon = null
  return (
    <div className="pokemon">
      Hello, <span>{pokémon}</span>!
    </div>
  )
}

const domElement = document.getElementById('root')
ReactDOM.render(<Pokemon />, domElement)
```

If we want to turn that `pokémon` variable into a stateful variable, we use
the `useState` hook.

```jsx
function Pokemon() {
  const [pokémon, setPokémon] = useState(null)
  return (
    <div className="pokemon">
      Hello, <span>{pokémon}</span>!
    </div>
  )
}
```

You can have as many states as you want in a given component, you just have
to call `useState` again.

```jsx
function Pokemon() {
  const [pokémon, setPokémon] = useState(null)
  const [error, setError] = useState(null)
  return (
    <div className="pokemon">
      Hello, <span>{pokémon}</span>!
    </div>
  )
}
```

You cannot put `useState` (or any hook call, for that matter) behind a
conditional. We'll get to that later! Let's make something that can
change state.

```jsx
function Pokemon() {
  const [pokémon, setPokémon] = useState(null)
  const [error, setError] = useState(null)
  return (
    <div className="pokemon">
      <input
        onChange={e => setPokémon(e.target.value)}
        value={inputValue}
        type="text"
      />
      Hello, <span>{pokémon}</span>!
    </div>
  )
}
```

So, whenever you call `setPokémon`, it changes the `pokémon` state variable.

Remember that React is declarative, not imperative. If you were to do this with
jQuery, for example, you'd have to select the element(s) you're updating,
capture the event, and then update the innerHTML of whatever you're listening
to. This is particularly evident when you're thinking about something like a
heater. React is like a modern wall thermometer where you say, "be 72 degrees"
and your heater adjusts accordingly to stay 72. jQuery (and several others) are
imperative, like a portable heater where you have to manually adjust heat up and
down as needed. We don't care as developers how we get to a certain point, we
just want to _declare_ a state that we want, and see the updates that we expect.

## Effects

Now, what if you wanted to populate this with real data? Let’s build a quick
little Pokémon search with the [PokéAPI](https://pokeapi.co/).

The `useEffect()` hook is for making side effects.

Here's an example of a side effect:

```js
let z = 10

let add = (x, y) => {
  z = x + 10 // this is the side effect
  return x + y
}
```

When you want something to happen that doesn't affect whether or not the
component gets rendered or not, you just want something to happen, you use
`useEffect`.

The two parameters are a function and a dependency array. The return value of
the function is a "cleaup function" which is something that runs when the
component is unmounted, or when state changes.

```jsx
function Pokemon() {
  const [pokémon, setPokémon] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    document.title = 'Saying hello to ' + pokémon
  }, [pokémon])

  return (
    <div className="pokemon">
      <input
        onChange={e => setPokémon(e.target.value)}
        value={inputValue}
        type="text"
      />
      Hello, <span>{pokémon}</span>!
    </div>
  )
}
```

The contents of the dependency array are state-related: variables/functions that
are state, use state, or change state. In this case, we're making sure that the
document title is staying in sync with the `pokémon` state variable.

Now, let's call the PokéAPI in `useEffect`:

```jsx
function Pokemon() {
  const [pokémon, setPokémon] = useState('pikachu')
  const [img, setImg] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    document.title = 'Saying hello to ' + pokémon
  }, [pokémon])

  useEffect(() => {
    let isCurrent = true
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokémon}/`)
      .then(res => res.json())
      .then(res => {
        if (isCurrent) {
          let name = res.name
          let sprite = res.sprites.front_default
          setPokémon(name)
          setImg(sprite)
        }
      })
      .catch(error => {
        setError(error)
      })
    return () => {
      isCurrent = false
    }
  }, [pokémon])

  return (
    <div className="pokemon">
      <input
        onChange={e => setPokémon(e.target.value)}
        defaultValue={pokémon}
        type="text"
      />
      Hello, <span>{pokémon}</span>!
      <img src={img} />
    </div>
  )
}
```

We could also conditionally render the image to check if it's null or not:

```jsx
return (
  <div className="pokemon">
    <input
      onChange={e => setPokémon(e.target.value)}
      defaultValue={pokémon}
      type="text"
    />
    Hello, <span>{pokémon}</span>! {img && <img src={img} />}
  </div>
)
```

Now, our component is getting pretty dang big. Let's refactor it with some
custom hooks and components.

First, the document title could be in its own custom hook:

```jsx
function useTitle(title) {
  useEffect(() => {
    document.title = title
  }, [title])
}

// ...

useTitle('Saying hello to ' + pokémon.name)
```

Now, we could also say that we want our input box to be a special <PokemonInput
/> component that we can reuse:

```jsx
function PokemonInput({ defaultValue, onChange }) {
  const [pokémon, setPokémon] = useState('pikachu')
  const [img, setImg] = useState()
  const [error, setError] = useState(null)

  useEffect(() => {
    let isCurrent = true
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokémon}/`)
      .then(res => res.json())
      .then(res => {
        if (isCurrent) {
          let name = res.name
          let sprite = res.sprites.front_default
          onChange({ name, sprite })
          setPokémon(name)
          setImg(sprite)
        }
      })
      .catch(error => {
        setError(error)
      })
    return () => {
      isCurrent = false
    }
  }, [pokémon])

  return (
    <input
      onChange={e => setPokémon(e.target.value)}
      defaultValue={defaultValue}
      type="text"
      style={{ color: error ? '#d5615e' : '' }}
    />
  )
}

// ...

function Pokemon() {
  // Change state here to be a Pokemon object
  const [pokémon, setPokémon] = useState({
    name: 'Pikachu',
    sprite: null
  })
  useTitle('Saying hello to ' + pokémon.name)

  return (
    <div className="pokemon">
      <PokemonInput
        onChange={fetchedPokemon => setPokémon(fetchedPokemon)}
        defaultValue={pokémon.name}
        type="text"
      />
      Hello, <span>{pokémon.name}</span>! {pokémon.sprite && <img src={pokémon.sprite} />}
    </div>
  )
}
```

So this is how a component uses state, effects, and responds to updates. You can
scoot out different parts of the components into separate ones, and we'll be
talking a lot more about that.
