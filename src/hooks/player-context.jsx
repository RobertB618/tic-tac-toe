
import { createContext, useContext } from 'react'

const PlayerContext = createContext(null)

export const PlayerProvider = ({ player, children }) => {
    return (
        <PlayerContext.Provider value={player}>
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    const context = useContext(PlayerContext)
    if (context === undefined) {
        throw new Error('usePlayer must be used within a PlayerProvider')
    }
    return context
}
