import { createContext } from "react"

interface AuthContextType {
    isAuthinticated: boolean,
    setIsAuthinticated: (isAuthinticated: boolean) => void

}

const AuthContext = createContext<AuthContextType>({
    isAuthinticated: false,
    setIsAuthinticated: () => { }
})

export default AuthContext