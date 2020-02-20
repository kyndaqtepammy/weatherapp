import React from 'react'

/**
* @author
* @function WeatherCard
**/

const WeatherCard = (props) => {
  return(
    <div>
        <div className="card">
            <img src={props.imgSrc} className="icon" alt="icon"/>
            <div className="weatherDetails">
                <h3 className="">{props.temp_max}</h3>
            </div>
        </div>
    </div>
   )

 }

export default WeatherCard;