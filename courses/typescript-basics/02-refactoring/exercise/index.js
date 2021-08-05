import './styles.scss'

main()

function createCalculator() {
  const calculatorElem = document.getElementById('calculator')
  const displayElem = document.getElementById('display')
  const displayTextElem = displayElem.querySelector('span')
  const buttonDecimal = document.getElementById('dec')
  const buttonClear = document.getElementById('clr')
  const buttonPercent = document.getElementById('per')
  const buttonEqual = document.getElementById('eq')
  const buttonPosOrNeg = document.getElementById('pos-neg')

  // Calculator state
  const calcState = {
    prevDisplayValue: 0,
    currentDisplayValue: 0,
    prevCalcValue: null,
    nextCalcValue: null,
    calcValue: 0,
    operator: null,
    operatorActive: false,
    clearToType: true,
    cleared: true,
  }

  initEvents()

  // Set up observer to watch for display changes
  const displayObserver = new MutationObserver(onDisplayChange)
  // Watch for display changes
  displayObserver.observe(displayTextElem, { childList: true })

  function setState({ ...newState }) {
    try {
      for (let prop in newState) {
        if (Object.hasOwnProperty.call(calcState, prop)) {
          calcState[prop] = newState[prop]
        } else {
          console.log(`Invalid state property "${prop}"`)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Clear out calulations in state
  function clearCalcValues() {
    setState({
      prevCalcValue: null,
      nextCalcValue: null,
      cleared: true,
    })
  }

  // Callback for mutation observer on the display element
  function onDisplayChange(mutations) {
    try {
      const { addedNodes, removedNodes } = mutations[0]
      const prevDisplayValue = removedNodes.length > 0 ? removedNodes[0].textContent : '0'
      const currentDisplayValue = addedNodes.length > 0 ? addedNodes[0].textContent : '0'
      setState({ currentDisplayValue, prevDisplayValue })
    } catch (error) {
      console.log(error)
    }
  }

  function doCalc(a, b, operator) {
    try {
      a = parseFloat(a)
      b = parseFloat(b)
      switch (operator) {
        case 'div':
          return parseFloat(a / b)
        case 'mul':
          return parseFloat(a * b)
        case 'min':
          return parseFloat(a - b)
        case 'add':
          return parseFloat(a + b)
        default:
          throw Error('Unknown operator. Not sure what happened here!')
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Get the current display value
  function getDisplayValue() {
    return displayTextElem.innerText
  }

  // Update the display with a new value.
  function updateDisplay(val = 0) {
    displayTextElem.innerHTML = val
  }

  // What to do when the page initially loads
  function onPageLoad() {
    updateDisplay(0)
  }

  // Handle number keys
  function onNumberChange(event) {
    const { cleared } = calcState
    const startingValue = getDisplayValue()
    const valueToAdd = event.currentTarget.innerText
    if (calcState.clearToType) {
      updateDisplay(concatDisplayValues(startingValue, valueToAdd))
    } else {
      updateDisplay(valueToAdd)
      setState({ clearToType: true })
    }
    if (cleared) {
      setState({ cleared: false })
    }
  }

  // Remove active class from all math buttons
  function removeActiveMath() {
    for (let button of document.querySelectorAll('.btn.math')) {
      button.classList.remove('active')
    }
  }

  // Add active state to math button
  function activateMath(cur) {
    removeActiveMath()
    cur.classList.add('active')
    setState({ operatorActive: true })
  }

  // Handle the equal key
  function onPressEqual() {
    removeActiveMath()
  }

  // Handle the operator keys
  function onPressOperator(event) {
    const id = event.currentTarget.id
    const { prevCalcValue, operator } = calcState
    if (prevCalcValue !== null && operator !== null) {
      updateDisplay(doCalc(prevCalcValue, getDisplayValue(), operator))
    }
    if (id !== 'eq') {
      activateMath(event.currentTarget)
      setState({
        operatorActive: true,
        operator: id,
        prevCalcValue: getDisplayValue(),
        clearToType: false,
      })

      // Equals button
    } else {
      setState({
        // prevDisplayValue: 0,
        prevCalcValue: null,
        nextCalcValue: null,
        calcValue: 0,
        operatorActive: false,
        clearToType: false,
      })
    }
  }

  // Dat decimal tho
  function onPressDecimal() {
    const curVal = getDisplayValue()
    const newVal = concatDisplayValues(curVal, '.')
    // Check if decimal is already displayed
    if (curVal.indexOf('.') === -1) {
      updateDisplay(newVal)
    }
  }

  // Clear button
  function onPressClear() {
    setState({ clearToType: true, operatorActive: false })
    updateDisplay()
    removeActiveMath()
    clearCalcValues()
  }

  // Percent button
  function onPressPercent() {
    updateDisplay(getDisplayValue() * 0.01)
    setState({ clearToType: false })
  }

  // Invert pos/neg
  function onPressInvert() {
    updateDisplay(getDisplayValue() * -1)
    setState({ clearToType: false })
  }

  // Concatenate display values as you type
  function concatDisplayValues(cur, add) {
    if (cur === '0' && add !== '.') return add
    return cur + '' + add
  }

  // Window drag function
  // I'm lazy, soooo...yanked from
  // https://www.w3schools.com/howto/howto_js_draggable.asp
  function dragCalc(el, dragger) {
    let pos1 = 0
    let pos2 = 0
    let pos3 = 0
    let pos4 = 0
    dragger.onmousedown = dragMouseDown

    function dragMouseDown(event) {
      event = event || window.event
      event.preventDefault()

      // Get the mouse cursor position at startup:
      pos3 = event.clientX
      pos4 = event.clientY
      document.onmouseup = closeDragElement
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag
    }

    function elementDrag(event) {
      event = event || window.event
      event.preventDefault()
      // calculate the new cursor position:
      pos1 = pos3 - event.clientX
      pos2 = pos4 - event.clientY
      pos3 = event.clientX
      pos4 = event.clientY
      // set the element's new position:
      el.style.top = el.offsetTop - pos2 + 'px'
      el.style.left = el.offsetLeft - pos1 + 'px'
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null
      document.onmousemove = null
    }
  }

  function initEvents() {
    // Initialize calculator
    document.addEventListener('DOMContentLoaded', onPageLoad)

    // Make it draggable
    dragCalc(calculatorElem, displayElem)

    // Math operator buttons
    document.querySelectorAll('.btn.math').forEach((button) => {
      button.addEventListener('click', onPressOperator)
    })

    // Clear button
    buttonClear.addEventListener('click', onPressClear)

    // Equal button
    buttonEqual.addEventListener('click', onPressEqual)

    // Number buttons
    for (let i = 0; i < 10; ++i) {
      document.getElementById(`n${i}`).addEventListener('click', onNumberChange)
    }

    // Pos/Neg toggle
    buttonPosOrNeg.addEventListener('click', onPressInvert)

    // Percent toggle
    buttonPercent.addEventListener('click', onPressPercent)

    // Decimal button
    buttonDecimal.addEventListener('click', onPressDecimal)
  }
}

function main() {
  renderMarkup()
  createCalculator()
}

function renderMarkup() {
  let root = document.getElementById('root')
  root.innerHTML = getMarkup()
}

function getMarkup() {
  return `
      <div class="app"></div>

<div id="calculator" class="calculator">

  <!-- Display -->
  <div id="display" class="display">
    <span></span>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>

  <!-- Toggles -->
  <button id="clr" class="btn toggle clr">AC</button>
  <button id="pos-neg" class="btn toggle pos-neg">
    <span>+</span>
    <span>/</span>
    <span>−</span>
  </button>
  <button id="per" class="btn toggle per">%</button>

  <!-- Math -->
  <button id="div" class="btn math div">÷</button>
  <button id="mul" class="btn math mul">×</button>
  <button id="min" class="btn math min">−</button>
  <button id="add" class="btn math add">+</button>
  <button id="eq" class="btn math eq">=</button>

  <!-- Decimal -->
  <button id="dec" class="btn num dec">.</button>

  <!-- Numbers -->
  <button id="n1" class="btn num n1">1</button>
  <button id="n2" class="btn num n2">2</button>
  <button id="n3" class="btn num n3">3</button>
  <button id="n4" class="btn num n4">4</button>
  <button id="n5" class="btn num n5">5</button>
  <button id="n6" class="btn num n6">6</button>
  <button id="n7" class="btn num n7">7</button>
  <button id="n8" class="btn num n8">8</button>
  <button id="n9" class="btn num n9">9</button>
  <button id="n0" class="btn num n0">0</button>

</div>
    `
}
