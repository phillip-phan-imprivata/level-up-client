import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { GameContext } from "../game/GameProvider"
import { EventContext } from "./EventProvider"


export const EventForm = () => {
    const {getGames, games} = useContext(GameContext)
    const {createEvent} = useContext(EventContext)
    const history = useHistory()

    const [currentEvent, setEvent] = useState({
        "description": "",
        "organizer": 0,
        "gameId": 0,
        "date": "",
        "time": ""
    })

    useEffect(() => {
        getGames()
    }, [])

    const changeEventState = (domEvent) => {
        let newEvent = {...currentEvent}
        newEvent[domEvent.target.name] = domEvent.target.value
        setEvent(newEvent)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={ currentEvent.gameId }
                        onChange={ changeEventState }>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option key={game.id} value={game.id}>{game.title}</option>
                            ))
                        }
                    </select>
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" className="form-control" value={currentEvent.date} onChange={changeEventState} required />
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" className="form-control" value={currentEvent.time} onChange={changeEventState} required />
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" className="form-control" value={currentEvent.description} onChange={changeEventState} required />
                </div>
            </fieldset>

            {/* Create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    // Create the event
                    const event = {
                        description: currentEvent.description,
                        organizer: parseInt(currentEvent.organizer),
                        gameId: parseInt(currentEvent.gameId),
                        date: currentEvent.date,
                        time: currentEvent.time
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => history.push("/events"))

                    // Once event is created, redirect user to event list
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}