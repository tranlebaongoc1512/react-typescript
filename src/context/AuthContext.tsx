import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

type AuthContextProviderProps = {
    children: React.ReactNode
}
interface User {[index: string]: any}

interface AuthContextProps {
    googleSignIn: () => void;
    logOut: () => void;
    user: User;
}
const initialState: AuthContextProps = {
    googleSignIn: () => { },
    logOut: () => { },
    user: {}
}

export const AuthContext = createContext<AuthContextProps>(initialState);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState<User>({});

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    const logOut = async () => {
        try {
          await signOut(auth);
          setUser({});
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            }
        });

        return () => {
            unSubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
            {children}
        </AuthContext.Provider>
    );
};
