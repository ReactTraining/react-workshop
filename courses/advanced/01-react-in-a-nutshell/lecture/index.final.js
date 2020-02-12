import React from 'react'
import ReactDOM from 'react-dom'
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
          let name = res.name.replace(/^\w/, c => c.toUpperCase())
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
      style={{ borderColor: error ? 'red' : '' }}
    />
  )
}

function Pokemon() {
  const [pokémon, setPokémon] = useState({ name: 'Pikachu', sprite: null })
  useTitle('Saying hello to ' + pokémon.name)

  return (
    <div>
      <PokemonInput
        onChange={fetchedPokemon => setPokémon(fetchedPokemon)}
        defaultValue={pokémon.name}
        type="text"
      />
      Hello, {pokémon.name}! {pokémon.sprite && <img src={pokémon.sprite} />}
    </div>
  )
}

const domElement = document.getElementById('root')
ReactDOM.render(<Pokemon />, domElement)
