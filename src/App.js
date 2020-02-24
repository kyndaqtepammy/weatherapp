import React from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import Weather from './components/Weather';
import getWeather from './functions/getWeather';
let city= "New York";
let weatherList = [];


function getDayOfWeek(dateString) {
  dateString = dateString.substr(0, dateString.indexOf(',')); 
  return dateString;
}

function getFullDate(dateString) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let d = new Date(dateString);
  let monthName = monthNames[d.getMonth()];
  let dayName = days[d.getDay()];
  let date = d.getDate();
  let year = d.getFullYear();
  return `${dayName},  ${date}  ${monthName} ${year}`;
}



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: undefined,
      city: undefined,
      description:undefined,
      icon: undefined,
      datetime: undefined
   }
   this.handleCitySelected = this.handleCitySelected.bind(this);
   this.handleCardClicked = this.handleCardClicked.bind(this);
  }

  
  setTheState = (data) => {
    this.setState({
      temperature: data.list[0].main.temp_max,
      city: data.city.name,
      description: data.list[0].weather[0].description,
      icon: data.list[0].weather[0].icon,
      datetime: getFullDate(data.list[0].dt_txt)
  });
}


  async componentWillMount () {
    let data = await getWeather(city)
    weatherList = this.getDailyForecast(data.list)
    this.setTheState(data);

}
    
    
  handleCardClicked(e) {
    let element =  e.currentTarget.id;
    let icon = `icon-${element}`;
    let temperature = `inner-details-${element}`;
    let description = `description-${element}`;
    let datetime = `weekday-${element}`;

    this.setState({
      temperature: parseInt(document.getElementById(temperature).innerText),
      description:document.getElementById(description).textContent,
      icon: document.getElementById(icon).alt,
      datetime: document.getElementById(datetime).innerText
  });
    
  }

  
  async handleCitySelected(e) {
    city = e.target[e.target.selectedIndex].value;
    let data = await getWeather(city);
    weatherList = this.getDailyForecast(data.list)
 
    this.setTheState(data);
}

  getDailyForecast(data) {
    let list = [];
    for(let i = 0; i < data.length; i += 8) {
      list.push({
        description: data[i].weather[0].description,
        temp_max: data[i].main.temp_max,
        datetime: data[i].dt_txt,
        icon: data[i].weather[0].icon
      })
    }
    return list;
  }

  render() {
    return (
      <div className="App">
        <div className="main">
        <NavigationBar/>
          <form style={{marginTop:"10%"}}>
            <div className="select-style">
              <select name="city" id="city" onChange={this.handleCitySelected}>
                  <option value="New York">New York</option>
                  <option value="Las Vegas">Las Vegas</option>
                  <option value="Houston">Houston</option>
                  <option value="Los Angeles">Los Angeles</option>
              </select> 
            </div>
        </form>
        </div>
        <div className="weatherHero">
          <Weather 
            temperature = {Math.round(parseInt(this.state.temperature))}
            city = {this.state.city}
            description = {this.state.description}
            icon = {`http://openweathermap.org/img/wn/${(this.state.icon)}@2x.png`}
            datetime = {this.state.datetime }/>
        </div>
        <div className="weatherCards">
            {weatherList.map(item=>(
                <div className="card"  onClick={this.handleCardClicked} key={getDayOfWeek(getFullDate(item.datetime))} id={getDayOfWeek(getFullDate(item.datetime))}>
                  <div className="card-inner dayOfWeek" id={`weekday-${getDayOfWeek(getFullDate(item.datetime))}`}>{getDayOfWeek(getFullDate(item.datetime))}</div>
                    <img src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`} className="card-inner icon" id={`icon-${getDayOfWeek(getFullDate(item.datetime))}`} alt={item.icon}/>
                    <div className="card-inner weatherDetails" id={`details-${getDayOfWeek(getFullDate(item.datetime))}`}>
                        <h3 id={`inner-details-${getDayOfWeek(getFullDate(item.datetime))}`}>{Math.round(item.temp_max)}&#8451;</h3>
                    </div>
                    <span className="hidden" id={`description-${getDayOfWeek(getFullDate(item.datetime))}`}>{item.description}</span>
                </div>
            ))}
        </div>
      </div>
    );
  }
}

export default App;
