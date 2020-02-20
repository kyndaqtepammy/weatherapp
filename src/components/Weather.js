import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
* @author
* @class Weather
**/

class Weather extends Component {
 state = {}
 render() {
  const unixTimestamp = this.props.datetime;
  var date = new Date();
  date.setTime(unixTimestamp * 1000);
  var day = date.getDay();
  var time = date.getTime();

  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var d = new Date(unixTimestamp);
  var dayName = days[d.getDay()];
  return(
   <div>
       <h1>{this.props.city}</h1>
       <h3>{this.props.temperature}&#8451;</h3>
       <h3>{this.props.description}</h3>
       <div><img src = {"http://openweathermap.org/img/wn/"  +this.props.icon+ "@2x.png" } alt= "icon" /></div>
   </div>
    )
   }
 }


Weather.propTypes = {}
export default Weather