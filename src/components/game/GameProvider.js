import React, { useState } from "react"

export const GameContext = React.createContext()

export const GameProvider = (props) => {
    const [ games, setGames ] = useState([])
    const [ gameTypes, setTypes ] = useState([])

    const getGames = () => {
        return fetch("http://localhost:8000/games", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setGames)
    }

    const createGame = (game) => {
      return fetch("http://localhost:8000/games", { 
          method: "POST",
          headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(game)
      })
          .then(res => res.json())
          .then(getGames)
  }

    const editGame = (game) => {
      return fetch(`http://localhost:8000/games/${game.id}`, { 
          method: "PUT",
          headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(game)
      })
          .then(getGames)
  }
  
  const getGameTypes = () => {
      return fetch("http://localhost:8000/gametypes", { 
        headers:{
          "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
      })
          .then(res => res.json())
          .then(setTypes)
  }

  const getGame = (gameId) => {
      return fetch(`http://localhost:8000/games/${gameId}`, {
          headers:{
              "Authorization": `Token ${localStorage.getItem("lu_token")}`
          }
      })
      .then(res => res.json())
  }

    return (
        <GameContext.Provider value={{ games, getGames, createGame, getGameTypes, gameTypes, getGame, editGame }} >
            { props.children }
        </GameContext.Provider>
    )
}