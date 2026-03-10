import React, { createContext, useContext, useState, useMemo } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Simulate a login
    const login = (username) => {
        setUser({ username });
    };

    const logout = () => {
        setUser(null);
    };

    // Provide the auth value memoized to prevent unnecessary re-renders in consumers
    const value = useMemo(() => ({
        user,
        login,
        logout
    }), [user]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
