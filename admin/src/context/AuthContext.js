import { createContext , useEffect, useReducer } from "react";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")),
    loading: false,
    err: null
}

// const userFromLocalStorage = localStorage.getItem("user");

// const INITIAL_STATE = {
//     user: userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null,
//     loading: false,
//     error: null
// };

export const authContext = createContext(INITIAL_STATE)

const authReducer = (action , state) =>{
    switch(action.type){
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                err: null,
            }

            case "LOGIN_SUCCESS":
                return {
                    user: action.payload,
                    loading: false,
                    err: null,
                }
            
            case "LOGIN_FAILURE":
                return {
                    user: null,
                    loading: false,
                    err: action.payload,
                }
            case "LOGOUT":
                return {
                    user: null,
                    loading: false,
                    err: null,
                }
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer , INITIAL_STATE)

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])

    return (
        <authContext.Provider
            value = {{
                user: state.user,
                loading: state.loading,
                err: state.err,
                dispatch,
            }}
        >
            {children}
        </authContext.Provider>
    )
}
