import {createContext, useState} from 'react'

const Context = createContext()

function Provider({children}){
    const [navbar, setNavbar]= useState(false)
    return (
        <Context.Provider  value={{navbar, setNavbar}}>{children}</Context.Provider>
    )
}
export {Provider, Context}