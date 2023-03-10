import React from 'react'
import "./herder.css"
import { Link } from 'react-router-dom';
export default function Header() {

  return (
    <>
      <div className='header'>
       
        <Link className='linkxhx'  to="/"> <div className='font0'
        onClick={() => { }}>交易</div>
      </Link>

      <Link  className='linkxhx' to="/Mine">
        <div  className='font0'> 我的</div>
      </Link>
      </div>
    </>
  )
}
