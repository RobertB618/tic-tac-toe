import { createContext, useContext } from 'react';

// Create a context for player information
const PlayerContext = createContext(null);

// PlayerProvider component to provide player information to its children
export const PlayerProvider = ({ player, children }) => {
    return (
        // Provide the current player's value to the context
        <PlayerContext.Provider value={player}>
            {children}
        </PlayerContext.Provider>
    );
};

// Custom hook to access player information from the PlayerContext
export const usePlayer = () => {
    // Retrieve the context value
    const context = useContext(PlayerContext);

    // If the hook is used outside of a PlayerProvider, throw an error
    if (context === undefined) {
        throw new Error('usePlayer must be used within a PlayerProvider');
    }

    return context;
};
