import React from 'react'
import logo from '../assets/img/sun-logo.png'

/**
* @author
* @function NavigationBar
**/

const NavigationBar = (props) => {
  return(
    <div className="navigation" >
        <img src ={logo} alt="Logo"/>
        <h3 className="brand">Weather App</h3>
    </div>
   )

 }

export default NavigationBar