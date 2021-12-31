import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    updateEmail, 
    updatePassword, 
    sendPasswordResetEmail, 
    signInWithEmailAndPassword } from "firebase/auth";

const authe = getAuth();

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {//good
    return createUserWithEmailAndPassword(authe, email, password)
    //return createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {//good
    return signInWithEmailAndPassword(authe, email, password)
  }

  function logout() {//good
    return auth.signOut()
  }

  function resetPassword(email) {//good
    return sendPasswordResetEmail(auth, email)
  }

  function changeEmail(email) {//good
    return updateEmail(authe.currentUser, email)
  }

  function changePassword(password) {//good
    return updatePassword(authe.currentUser, password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    changeEmail,
    changePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
} 