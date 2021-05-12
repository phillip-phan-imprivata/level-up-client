import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'


export const GameForm = (props) => {
    const { createGame, getGameTypes, gameTypes, getGame, editGame } = useContext(GameContext)
    
    const history = useHistory()
    const {gameId} = useParams()
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getGameTypes()
    }, [])

    useEffect(() => {
        if (gameId) {
            getGame(gameId).then(game => {
                setCurrentGame({
                    skillLevel: game.skill_level,
                    numberOfPlayers: game.number_of_players,
                    title: game.title,
                    gameTypeId: game.gametype.id,
                    maker: game.maker
                })
            })
        }
    }, [gameId])

    /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [event.target.name]
    */
    const changeGameState = (event) => {
        const newGameState = { ...currentGame }
        newGameState[event.target.name] = event.target.value
        setCurrentGame(newGameState)
    }

    /* REFACTOR CHALLENGE END */

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required className="form-control" value={currentGame.maker} onChange={changeGameState} />
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="number" name="numberOfPlayers" required className="form-control" value={currentGame.numberOfPlayers} onChange={changeGameState} />
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="number" name="skillLevel" required className="form-control" value={currentGame.skillLevel} onChange={changeGameState} />
                    <select onChange={changeGameState} name="gameTypeId" className="form-control" required value={currentGame.gameTypeId}>
                      <option value="0">Game Type: </option>
                      {
                      gameTypes.map(gt => {
                        return(
                          <option key={gt.id} value={gt.id}>{gt.label}</option>
                        )
                      })
                      }
                    </select>
                </div>
            </fieldset>
            {
                (gameId)
                    ? <button type="submit"
                    onClick={evt => {
                        evt.preventDefault()
                        editGame({
                            id: gameId,
                            maker: currentGame.maker,
                            title: currentGame.title,
                            numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                            skillLevel: parseInt(currentGame.skillLevel),
                            gameTypeId: parseInt(currentGame.gameTypeId)
                        })
                        history.push("/games")
                    }}
                    className="btn btn-primary">Edit</button>
                    : <button type="submit"
                    onClick={evt => {
                        evt.preventDefault()
                        createGame({
                            maker: currentGame.maker,
                            title: currentGame.title,
                            numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                            skillLevel: parseInt(currentGame.skillLevel),
                            gameTypeId: parseInt(currentGame.gameTypeId)
                        })
                        history.push("/games")
                    }}
                    className="btn btn-primary">Create</button>
            }

            {/* You create the rest of the input fields for each game property */}
            
        </form>
    )
}