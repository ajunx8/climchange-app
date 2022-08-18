import React, { useEffect, useState } from 'react';
import { callAPI } from '../api.js';
import '../styles/WeatherSearch.css';
import CoordinatesForm from '../components/CoordinatesForm';

const Api_Key = "25b382e32ccd487eb88549c3ac8a5f7c";

function WeatherSearch() {

    const latitude = '-33.87098868056243';
    const longitude = '151.20477287220643';
    const [data, setData] = useState({});

    const fetchData = async () => {
        let APIResult = callAPI(latitude, longitude);
        await setData(APIResult); // makes sure to load the page after the data has been received
    }



    function getWeather () {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is: ", position.coords.latitude);
            console.log("Longitude is: ", position.coords.longitude);
            // setLatitude(position.coords.latitude);
            // setLongitude(position.coords.longitude);
        });

        fetchData();
        console.log(data);
    };

    return (
        <div>
        
            <button onClick={ getWeather }>
                Search Current Location.
            </button>
            

       <p>or enter coordinates manually:</p>

        Latitude:
        
        <CoordinatesForm />

       </div>
    );
}

export default WeatherSearch;