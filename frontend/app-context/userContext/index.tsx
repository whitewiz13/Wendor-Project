'use client'
import { useReducer, createContext } from "react";
import { userReducer, initialState } from "./reducer";

// create context
const UserContext = createContext({});

// context provider
const UserProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(userReducer, initialState); // pass more reducers combineReducers(user, blogs, products)
    const value = { state, dispatch };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };