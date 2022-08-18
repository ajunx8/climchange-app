import React, { useEffect, useState } from 'react';
import { callAPI } from '../api.js';
import '../styles/WeatherSearch.css';

const Api_Key = "25b382e32ccd487eb88549c3ac8a5f7c";

function WeatherSearch() {

    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [data, setData] = useState({});

    const fetchData = async () => {
        let APIResult = callAPI(latitude, longitude);
        await setData(APIResult); // makes sure to load the page after the data has been received
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude is: ", position.coords.latitude);
        console.log("Longitude is: ", position.coords.longitude);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    });

    useEffect = (() => {
        fetchData();
        console.log(data);
    }, []);

    return (
       <button onClick={ WeatherSearch }>
        Search!
       </button>
       
    );
}


export default WeatherSearch;