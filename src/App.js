import { useEffect, useState } from "react"
import "./App.css"
import { getAllPokemon, getPokemon } from "./utils/pokemon"
import Card from "./components/Card/Card"
import Navbar from "./components/Navbar/Navbar"


function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon"
  const [loading, setLoading] = useState(true)
  const [pokemonData, setPokemonData] = useState([])
  const [nextURL, setNextURL] =useState("")

  useEffect(() => {
    const fetchPokemonData = async () => {
      //全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL)
      loadPokemon(res.results)
      setNextURL(res.next)
      setLoading(false)
    }
    fetchPokemonData()
  }, [])

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url)
        return pokemonRecord
      })
    )

    setPokemonData(_pokemonData)
  }

  
  const handlePrevPage =() => {}


  const handleNextPage = async() => {
    setLoading(true)
    let data = await getAllPokemon(nextURL)
    setNextURL(data.next)
    await loadPokemon(data.results)
    setLoading(false)
  }


  


  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>ロード中・・・</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />
              })}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default App
