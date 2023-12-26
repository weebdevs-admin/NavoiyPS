import React from 'react'
import './Error.scss'
import { Link } from 'react-router-dom'
function Error() {
  return (
    <>
      <h2 className='error'>404 Not Found</h2>
      <Link className='errorlink' to={'/'}>Main</Link>
    </>
  )
}

export default Error
