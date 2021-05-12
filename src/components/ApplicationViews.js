import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList.js"
import { GameProvider } from "./game/GameProvider.js"
import { EventList } from "./gameEvent/EventList.js"
import { EventProvider } from "./gameEvent/EventProvider.js"
import { GameForm } from "./game/GameForm.js"
import { EventForm } from "./gameEvent/EventForm.js"
import { ProfileProvider } from "./auth/ProfileProvider.js"
import { Profile } from "./auth/ProfileComponent.js"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <GameProvider>
                <Route exact path="/games">
                    <GameList />
                </Route>
            </GameProvider>

            <EventProvider>
                <Route exact path="/events">
                    <EventList />
                </Route>
            </EventProvider>

            <GameProvider>
                <Route exact path="/games/new">
                    <GameForm />
                </Route>
                <Route exact path="/games/:gameId(\d+)/edit">
                    <GameForm />
                </Route>
            </GameProvider>

            <EventProvider>
            <GameProvider>
                <Route exact path="/events/new">
                    <EventForm />
                </Route>
            </GameProvider>
            </EventProvider>
            <ProfileProvider>
                <Route exact path="/profile">
                    <Profile />
                </Route>
            </ProfileProvider>
        </main>
    </>
}