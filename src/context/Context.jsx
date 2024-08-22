import React, { createContext, useState } from 'react'

const MainContext = createContext()

function ContextProvider({children}) {
    const [products, setProducts] = useState([]);
  return (
    <MainContext.Provider value={{products, setProducts}}>{children}</MainContext.Provider>
  )
}

export {ContextProvider, MainContext}