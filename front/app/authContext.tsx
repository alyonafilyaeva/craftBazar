import { createContext } from "react";

export const AuthContext = createContext({
    token: '',
    setToken: token => { },
    user: {},
    setUser: user => { }
})