import React, { useState } from 'react';
import '../styles/WeatherSearch.css';
import CoordinatesForm from '../components/CoordinatesForm';
import axios from 'axios';
import WeatherModal from '../components/WeatherDisplay';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'


function WeatherSearch() {

    const [data, setData] = useState();
    const [weatherModalOpen, setWeatherModalOpen] = useState(false);

    const fetchData = async (latitude, longitude) => {
        const APIKEY = '25b382e32ccd487eb88549c3ac8a5f7c';
        await axios(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}`).then((response) => {
            console.log(response.data);
            setData(response.data);
        });
    }

    async function getWeatherAtCurrentLocation() {
        navigator.geolocation.getCurrentPosition(function (position) {
            fetchData(position.coords.latitude, position.coords.longitude);
            setWeatherModalOpen(true);
        });
    };

    return (
        <div className="weatherSearch">
            <Button variant="contained" onClick={getWeatherAtCurrentLocation}>Search Current Location.</Button>
            <Typography>or enter coordinates manually:</Typography>
            <CoordinatesForm fetchData={fetchData} setWeatherModalOpen={setWeatherModalOpen} />
            <WeatherModal weatherModalOpen={weatherModalOpen} setWeatherModalOpen={setWeatherModalOpen} data={data} />
        </div>
    );
}

export default WeatherSearch;