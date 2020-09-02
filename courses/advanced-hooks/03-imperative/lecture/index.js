import React, {
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef
} from 'react'
import ReactDOM from 'react-dom'
import './styles.scss'

const CarouselContext = React.createContext()

function CarouselProvider({ children }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [carouselSize, setCarouselSize] = useState(null)

  const measureCarousel = useCallback(node => {
    const { width, height } = window.getComputedStyle(node)
    setCarouselSize({
      width: parseInt(width.replace('px', '')),
      height: parseInt(height.replace('px', ''))
    })
  }, [])

  const context = {
    measureCarousel,
    carouselSize,
    selectedIndex,
    setSelectedIndex,
    next: () => setSelectedIndex(selectedIndex + 1),
    previous: () => setSelectedIndex(selectedIndex - 1)
  }

  return (
    <CarouselContext.Provider value={context}>
      {children}
    </CarouselContext.Provider>
  )
}

function Carousel({ children, width, height }) {
  const { measureCarousel, selectedIndex, carouselSize } = useContext(
    CarouselContext
  )

  children = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      isSelected: index === selectedIndex
    })
  })

  return (
    <div
      className="carousel"
      ref={measureCarousel}
      style={{ width, height }}
    >
      <div
        className="carousel-wrap"
        style={
          carouselSize
            ? {
                width: carouselSize.width * children.length,
                height: carouselSize.height
              }
            : null
        }
      >
        {children}
      </div>
    </div>
  )
}

function CarouselPanel({ children, isSelected }) {
  const { carouselSize } = useContext(CarouselContext)
  const panelRef = useRef()

  useEffect(() => {
    if (isSelected) {
      panelRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [isSelected])

  return (
    <div
      className="carousel-panel"
      ref={panelRef}
      style={carouselSize ? { ...carouselSize } : null}
    >
      {children}
    </div>
  )
}

function CarouselNext({ children = 'Next' }) {
  const { next } = useContext(CarouselContext)
  return (
    <button className="button" onClick={next}>
      {children}
    </button>
  )
}

function CarouselPrevious({ children = 'Previous' }) {
  const { previous } = useContext(CarouselContext)
  return (
    <button className="button" onClick={previous}>
      {children}
    </button>
  )
}

function App() {
  return (
    <div className="spacing">
      <CarouselProvider>
        <Carousel width="100%" height="300px">
          <CarouselPanel>Panel One</CarouselPanel>
          <CarouselPanel>Panel Two</CarouselPanel>
          <CarouselPanel>Panel Three</CarouselPanel>
        </Carousel>
        <div className="horizontal-spacing">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </CarouselProvider>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
