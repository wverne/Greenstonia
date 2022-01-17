import React, { useState, useEffect } from 'react';

/* Components */

/* CSS styles */
import "./styles.css";

const WeatherComponent = () => {

    // state for historical weather
    const [yesterdayWeather, setyesterdayWeather] = useState(null);
    const [twoDaysAgoWeather, settwoDaysAgoWeather] = useState(null);    

    const parseHistoricalDailyWeather = (dailyWeatherData) => {
        // takes daily weather data from API call and returns array of weather data for that day
        // this is for historical daily weather (ie: yesterday and two days ago weather)

        // remember, there is a 24 hour hourly forecast. I am just taking weather at noon of requested day
        const dailyTemps = [];
        const dailyHumidity = [];
        const dailyWind = [];
        const dailyClouds = [];   // this is measured as a percentage (ie: 50% cloudy)

        for (const hourlyWeather of dailyWeatherData['hourly']) {
            // add hourly measurements reading to dailyTemps
            dailyTemps.push(hourlyWeather['temp']);
            dailyHumidity.push(hourlyWeather['humidity']);
            dailyWind.push(hourlyWeather['wind_speed']);
            dailyClouds.push(hourlyWeather['clouds']);
        }
        const hiTemp = Math.max(...dailyTemps).toFixed(2);  //toFixed = round to 2 decimal places
        const loTemp = Math.min(...dailyTemps).toFixed(2);

        // must write function to get avg of array
        const getAverage = (array) => array.reduce((a,b) => a + b) / array.length
        const avgHumidity = getAverage(dailyHumidity).toFixed(2);
        const avgWind = getAverage(dailyWind).toFixed(2);
        const avgClouds = getAverage(dailyClouds).toFixed(2);
        const precip = 'n/a';

        // THIS IS THE STRUCTURE OF THE DATA RETURNED FROM API CALL
        const dailyWeatherStats = {
            "hiTemp":hiTemp, 
            "loTemp":loTemp, 
            "humidity":avgHumidity, 
            "wind":avgWind, 
            "clouds":avgClouds, 
            "precip":precip
        }
        
        setyesterdayWeather(dailyWeatherStats);
    }

    useEffect(() => {

        // need to get UTC time for each of last two days
        // START HERE. Figure out how to get correct UTC timestamp
        const currentTimestamp = new Date().getTime();
        console.log('currentTimestamp: ', currentTimestamp - (24*60*60*1000));
        let yesterdayTimestamp = currentTimestamp - (24*60*60*1000)
        let twoDaysAgoTimestamp = currentTimestamp - (24*60*60*1000*2);

        //need to remove last 3 digits of UTC timestamp and convert to integer
        yesterdayTimestamp = Math.floor(yesterdayTimestamp/1000);
        twoDaysAgoTimestamp = Math.floor(twoDaysAgoTimestamp/1000);
    
        // // API call to OpenWeatherMap for yesterday's weather
        // fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=37.8849&lon=-78.8995&dt=${yesterdayTimestamp}&appid=333de4e909a5ffe9bfa46f0f89cad105&units=imperial`)
        //     .then(response => {
        //         return response.json();
        //     })
        //     .then((data) => {
        //         parseHistoricalDailyWeather(data);
        //     });

        // // API call to OpenWeatherMap for two days ago weather
        // fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=37.8849&lon=-78.8995&dt=${twoDaysAgoTimestamp}&appid=333de4e909a5ffe9bfa46f0f89cad105&units=imperial`)
        //     .then(response => {
        //         return response.json();
        //     })
        //     .then((data) => {
        //         // remember, there is a 24 hour hourly forecast. I am just taking weather at noon of requested day
        //         parseHistoricalDailyWeather(data);
        //     });


    });

    console.log('Yesterday Weather', yesterdayWeather);

    ///////////////////////////////////////
    // get dates for injecting into HTML //
    ///////////////////////////////////////

    let minus2days = new Date();
    minus2days.setDate(minus2days.getDate() -2);
    minus2days = minus2days.toLocaleDateString();

    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday = yesterday.toLocaleDateString();
    
    let today = new Date();
    today.setDate(today.getDate());
    today = today.toLocaleDateString();

    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow = tomorrow.toLocaleDateString();

    let plus2days = new Date();
    plus2days.setDate(plus2days.getDate() + 2);
    plus2days = plus2days.toLocaleDateString();

    let plus3days = new Date();
    plus3days.setDate(plus3days.getDate() + 3);
    plus3days = plus3days.toLocaleDateString();

    let plus4days = new Date();
    plus4days.setDate(plus4days.getDate() + 4);
    plus4days = plus4days.toLocaleDateString();

    return (
        <>
            <div id='weatherBox'>
                <h2>Weather</h2>
                <div id='dailyBoxes'>
                    <div id='dailyBox'>
                        <p id="day">-2 Days</p>
                        <p id="date">{minus2days}</p>
                        <p>Hi Temp:</p>
                        <p>Lo Temp: </p>
                        <p>Precip: </p>
                        <p>Wind: </p>
                        <p>Humidity: </p>
                    </div>
                    <div id='dailyBox'>
                        <p id="day">Yesterday</p>
                        <p id="date">{yesterday}</p>
                        <p>Hi Temp: </p>
                        <p>Lo Temp: </p>
                        <p>Precip: </p>
                        <p>Wind: </p>
                        <p>Humidity: </p>
                    </div>
                    <div id='dailyBox'>
                        <p id="day">Today</p>
                        <p id="date">{today}</p>
                        <p>Hi Temp: </p>
                        <p>Lo Temp: </p>
                        <p>Precip: </p>
                        <p>Wind: </p>
                        <p>Humidity: </p>
                    </div>
                    <div id='dailyBox'>
                        <p id="day">Tomorrow</p>
                        <p id="date">{tomorrow}</p>
                        <p>Hi Temp: </p>
                        <p>Lo Temp: </p>
                        <p>Precip: </p>
                        <p>Wind: </p>
                        <p>Humidity: </p>
                    </div>
                    <div id='dailyBox'>
                        <p id="day">+2 Days</p>
                        <p id="date">{plus2days}</p>
                        <p>Hi Temp: </p>
                        <p>Lo Temp: </p>
                        <p>Precip: </p>
                        <p>Wind: </p>
                        <p>Humidity: </p>
                    </div>
                    <div id='dailyBox'>
                        <p id="day">+3 Days</p>
                        <p id="date">{plus3days}</p>
                        <p>Hi Temp: </p>
                        <p>Lo Temp: </p>
                        <p>Precip: </p>
                        <p>Wind: </p>
                        <p>Humidity: </p>
                    </div>
                    <div id='dailyBox'>
                        <p id="day">+4 Days</p>
                        <p id="date">{plus4days}</p>
                        <p>Hi Temp: </p>
                        <p>Lo Temp: </p>
                        <p>Precip: </p>
                        <p>Wind: </p>
                        <p>Humidity: </p>
                    </div>
                </div>
            </div>
        </>
    )
};

export default WeatherComponent;
