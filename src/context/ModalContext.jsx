import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const openSearch = () => setIsSearchOpen(true);
    const closeSearch = () => setIsSearchOpen(false);

    const openAuth = () => setIsAuthOpen(true);
    const closeAuth = () => setIsAuthOpen(false);

    const openFilter = () => setIsFilterOpen(true);
    const closeFilter = () => setIsFilterOpen(false);

    return (
        <ModalContext.Provider
            value={{
                isSearchOpen,
                openSearch,
                closeSearch,
                isAuthOpen,
                openAuth,
                closeAuth,
                isFilterOpen,
                openFilter,
                closeFilter,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
