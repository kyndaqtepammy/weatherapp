import React from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import Form from './components/Form';
import Weather from './components/Weather';
import Titles from './components/Titles';
const API_KEY = "eb5735b5bac47145362f014d98c1534e";
var country = "zimbabwe";


class App extends React.Component {
  getWeather = async (e) => {
    e.persist();
    const city = "harare";
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    console.log(e.target[e.target.selectedIndex].value);
  }

  render() {
    return (
      <div className="App">
        <NavigationBar/>
        <Titles/>
        <Form getWeather = {this.getWeather}/>
        <Weather/>
      </div>
    );
  }
}

export default App;
