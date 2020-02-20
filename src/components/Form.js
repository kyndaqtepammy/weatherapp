import React, { Component } from 'react'

/**
* @author
* @class Form
**/

class Form extends Component {
 state = {
     
 }
 
 render() {
  return(
   <div>
       <form>
        <select name="city" onChange={this.props.getWeather}>
            <option value="Las Vegas">Las Vegas</option>
            <option value="New York">New York</option>
            <option value="Houston">Houston</option>
            <option value="Los Angeles">Los Angeles</option>
            </select> 
       </form>
   </div>
    )
   }
 }


Form.propTypes = {}
export default Form