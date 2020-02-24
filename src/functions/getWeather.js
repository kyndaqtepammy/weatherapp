const getWeather = async (city) => {
    const API_KEY = "eb5735b5bac47145362f014d98c1534e";
    const country = "United States"
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    return data;
}
export default getWeather;