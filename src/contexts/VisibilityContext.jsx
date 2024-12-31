
import React, { createContext, useState, useContext } from 'react';

// Create a Context
const VisibilityContext = createContext();



// Create a provider component
export const VisibilityProvider = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(prev => !prev);

    return (
        <VisibilityContext.Provider value={{ isVisible, toggleVisibility }}>
            {children}
        </VisibilityContext.Provider>
    );
};
// Create a custom hook to use the context
export const useVisibility = () => useContext(VisibilityContext);