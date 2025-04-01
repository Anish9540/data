import React, { useState, createContext, useContext, useEffect } from "react";
import { initialUsers } from "../data/initialUsers";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Use localStorage to persist user data
    const [users, setUsers] = useState(() => {
        const savedUsers = localStorage.getItem('users');
        return savedUsers ? JSON.parse(savedUsers) : initialUsers;
    });

    const [currentUser, setCurrentUser] = useState(null);

    // Save users to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    const login = (email, password) => {
        const user = users.find((u) => u.email === email && u.password === password);
        if (user) {
            // Create a deep copy to avoid direct state mutation
            const userCopy = JSON.parse(JSON.stringify(user));
            setCurrentUser(userCopy);
        }
        return user || null;
    };

    const logout = () => setCurrentUser(null);

    const updateUserProfile = (updatedProfile) => {
        // Update the users array
        const updatedUsers = users.map(user =>
            user.id === updatedProfile.id ? { ...user, ...updatedProfile } : user
        );

        setUsers(updatedUsers);
        setCurrentUser(updatedProfile);
    };

    return (
        <AuthContext.Provider value={{
            currentUser,
            users,
            login,
            logout,
            updateUserProfile
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);