import React, { useContext } from 'react'
import './Navbar.scss'
import { Context } from '../../Context/Context'

function Navbar() {
    const {navbar,setNavbar} = useContext(Context)
  return (
    <>
        <div className="navbar"><i onClick={()=>setNavbar(true)} className="fa-solid fa-bars"></i> </div>
    </>
  ) 
}

export default Navbar
