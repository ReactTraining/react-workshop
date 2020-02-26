import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './styles.scss'

function useTitle(title) {
  useEffect(() => {
    document.title = title
  }, [title])
}

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
          setError(null)
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
    <div>
      <input
        placeholder="Who's that Pokémon?"
        onChange={e => setPokémon(e.target.value)}
        defaultValue={defaultValue}
        type="text"
        style={{ color: error ? '#d5615e' : '' }}
      />
    </div>
  )
}

function Pokemon() {
  const [pokémon, setPokémon] = useState({
    name: 'pikachu',
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
      Hello, <span>{pokémon.name}</span>!{' '}
      {pokémon.sprite && <img src={pokémon.sprite} />}
    </div>
  )
}

const domElement = document.getElementById('root')
ReactDOM.render(<Pokemon />, domElement)
