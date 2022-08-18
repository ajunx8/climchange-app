import React, { useEffect, useState } from 'react';
import { callAPI } from '../api.js';
import '../styles/WeatherSearch.css';
import CoordinatesForm from '../components/CoordinatesForm';
import axios from 'axios';
import WeatherDisplay from '../components/WeatherDisplay';

const Api_Key = "25b382e32ccd487eb88549c3ac8a5f7c"

function WeatherSearch() {
    
    const [data, setData] = useState({});
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();

    const fetchData = async (latitude, longitude) => {
        console.log('lat:', latitude, 'lon:', longitude);
        // let APIResult = await callAPI(latitude, longitude);
        const APIKEY = '25b382e32ccd487eb88549c3ac8a5f7c';
        await axios(`https://api.openweathermap.org/data/2.5/weather?lat=${ latitude }&lon=${ longitude }&appid=${ APIKEY }`).then((response) => {
            console.log(response.data);
            setData(response.data);
        });
    }


    async function getWeatherAtCurrentLocation () {
        await navigator.geolocation.getCurrentPosition(function (position) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            fetchData( position.coords.latitude, position.coords.longitude);

        });

        console.log(data);
    };

    return (
        <div>
        
            <button onClick={ getWeatherAtCurrentLocation }>
                Search Current Location.
            </button>
            

       <p>or enter coordinates manually:</p>

        Latitude:
        
        <CoordinatesForm fetchData={ fetchData } />
        <WeatherDisplay weatherData={data} />

       </div>
    );
}

export default WeatherSearch;