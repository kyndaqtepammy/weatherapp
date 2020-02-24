import React, { Component } from 'react'

/**
* @author
* @class Weather
**/

class Weather extends Component {
 state = {}
 render() {
  //const unixTimestamp = this.props.datetime;
  // var date = new Date();
  // date.setTime(unixTimestamp * 1000);
  // var day = date.getDay();
  // var time = date.getTime();

  // var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  // var d = new Date(unixTimestamp);
  // var dayName = days[d.getDay()];
  return(
   <div>
       <div className="weather city">{this.props.city}</div>
       <div className="weather dayofweek">{this.props.datetime}</div>
       <div className="weather description">{this.props.description}</div>
       <div className="weather icon-wrapper">
          <img src = {this.props.icon} alt= "icon" style={{width:"100px", height:"100px"}} />
          <span>{this.props.temperature}&#8451;</span>
       </div>
   </div>
    )
   }
 }


Weather.propTypes = {}
export default Weather