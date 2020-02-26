# Notes for Instructor

We can make that quantity value stateful by introducing useState. When we click the
buttons, React calls `Quantity()` again, compares the element we returned last
time with the element we've returned this time. React is tracking the old
and new elements for us, as well as the current state. When it finds a
difference between the old and new element, it updates the DOM with the
minimal set of changes required and leaves the rest alone. We can watch it
in the browser dev tools.

```jsx
export default function Quantity() {
  const [quantity, setQuantity] = useState(1)

  const handleAdd = () => setQuantity(quantity + 1)
  const handleSubtract = () => setQuantity(quantity - 1)

  return (
    <div className="quantity-picker">
      <div>
        <div>
          <button
            type="button"
            className="icon-button"
            onClick={handleAdd}
          >
            <FaMinusCircle />
          </button>
        </div>
        <div className="input-container">{quantity}</div>
        <div>
          <button
            type="button"
            className="icon-button"
            onClick={handleSubtract}
          >
            <FaPlusCircle />
          </button>
        </div>
      </div>
    </div>
  )
}
```

We get to decide when to change state and when not to,
maybe we only want positive values.

```jsx
const handleSubtract = () => {
  if (quantity > 1) setQuantity(quantity - 1)
}
```

We can add multiple states, like an error state when they try to use an
invalid value. You can use && like an "if" inside of JSX.

```jsx
export default function Quantity() {
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState(null)

  const handleAdd = () => {
    setQuantity(quantity + 1)
    setError(null)
  }
  const handleSubtract = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
      setError('Greater than 0, please!')
    }
  }

  return (
    <div className="quantity-picker">
      <div>
        <div>
          <button
            type="button"
            className="icon-button"
            onClick={handleAdd}
          >
            <FaMinusCircle />
          </button>
        </div>
        <div className="input-container">{quantity}</div>
        <div>
          <button
            type="button"
            className="icon-button"
            onClick={handleSubtract}
          >
            <FaPlusCircle />
          </button>
        </div>
      </div>
      {error && (
        <p>
          {error}{' '}
          <span role="img" aria-label="yikes">
            😬
          </span>
        </p>
      )}
    </div>
  )
}
```
