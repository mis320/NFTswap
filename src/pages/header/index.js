import React from 'react'
import "./herder.css"
import { Link } from 'react-router-dom';
export default function Header() {

  return (
    <>
      <div className='header'>
       
        <Link className='linkxhx'  to="/"> <div className='font0'
        onClick={() => { }}>δΊ€ζ</div>
      </Link>

      <Link  className='linkxhx' to="/Mine">
        <div  className='font0'> ζη</div>
      </Link>
      </div>
    </>
  )
}
