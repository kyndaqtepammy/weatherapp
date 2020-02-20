import React from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import Form from './components/Form';
import Weather from './components/Weather';
import Titles from './components/Titles';
import logo from './assets/img/logo.png'
const API_KEY = "eb5735b5bac47145362f014d98c1534e";

var weatherList = [];

// const singleCard = <myCard name="" temp="" color="">   </myCard>

function renderCards(props){
  return(
    <div className="row">
      {props.map(item=>(
          <div className="card">
            <span className="dayOfWeek"></span>
              <img src={logo} className="icon" alt="icon"/>
              <div className="weatherDetails">
                  <h3 className="">Max~ {item.temp_max}&#8451;</h3>
              </div>
          </div>
      ))}
    </div>
  );
}





class App extends React.Component {
   state = {
      temperature: undefined,
      city: undefined,
      humidity: undefined,
      country: undefined,
      error: undefined, 
      description:undefined,
      icon: undefined,
      datetime: undefined
   }


  getWeather = async (e) => {
    e.persist();
    const city = e.target[e.target.selectedIndex].value;
    const country = "United States"
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    const weatherData = data.list;
    console.log(data)
    weatherList = [];
    for(let i = 0; i < weatherData.length; i += 8) {
  
      weatherList.push(
        {
          description: weatherData[i].weather[0].description,
          temp_max: weatherData[i].main.temp_max,
          date: weatherData[i].dt_txt,
          icon: weatherData[i].weather[0].icon
        }
      )
    }
    
    // console.log(weatherList);
    if(city && country) {
      console.log(data)
      this.setState({
        temperature: data.list[5].main.temp_max,
        city: data.city.name,
        humidity: data.list[5].main.humidity,
        country: data.city.country,
        error: undefined, 
        description: data.list[1].weather[0].description,
        icon: data.list[1].weather[0].icon,
        datetime: data.list[5].dt_txt
      });


      
//  changeCards = ()=> {
//   alert("card has been changed");
//   this.setState({
//     temperature: "data.list[5].main.temp_max",
//     city: "data.city.name",
//     humidity: "data.list[5].main.humidity",
//     country: "data.city.country",
//     error: "undefined", 
//     description: "data.list[1].weather[0].description",
//     icon: "data.list[1].weather[0].icon",
//     datetime: "data.list[5].dt_txt"
//   });

// }

      function renderIcons() {
        switch (data.list[1].weather[0].icon) {
          case "01d":
            return "sunny day icon";
            break;
          case "02d":
              return "sunny night icon"
              break;
          default:    
        }
      }

    }

  }

  

  render() {
    return (
      <div className="App">
        <NavigationBar/>
        <Form getWeather = {this.getWeather}/>
        <Weather 
          temperature = {this.state.temperature}
          city = {this.state.city}
          country = {this.state.country}
          humidity = {this.state.humidity}
          description = {this.state.description}
          error = {this.state.error}
          icon = {this.state.icon}
        />

        <div>
          {renderCards(weatherList)}
        </div>
      </div>
    );
  }
}

export default App;
