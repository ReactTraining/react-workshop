// import { DateDisplay, DateYear, DateMonth, DateDay } from './DateDisplay.final'
import { DateDisplay, DateYear, DateMonth, DateDay } from './DateDisplay'

function Button() {}

function Icon() {}

function ShoppingCartButton() {
  function addToCart() {}
  return (
    <Button onClick={addToCart}>
      <Icon />
    </Button>
  )
}

function App() {
  return <ShoppingCartButton></ShoppingCartButton>
}

function SimpleDateDisplay() {
  return (
    <DateDisplay>
      <DateMonth format="MMMM" />
      <DateDay />
      <DateYear />
    </DateDisplay>
  )
}

export function App() {
  return (
    <div className="spacing-large">
      <div className="text-large text-center horizontal-spacing"></div>

      <p>
        A "compound component" is a pattern where one visual component is actually made with several
        React components being composed together. The React components are closely related and were
        specifically designed to be used together. The value of each being their own component means
        we can "compose" them in different orders and with our own choice of wrapping markup in the
        UI. In this case, Date, DateMonth, DateDay, and DateYear make a compound component.
      </p>
    </div>
  )
}
