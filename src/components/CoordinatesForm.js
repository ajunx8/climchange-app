 import { useState } from 'react';
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

function CoordinatesForm({ fetchData, setWeatherModalOpen }) {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchData(latitude, longitude);
        setWeatherModalOpen(true);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Typography>Enter your coordinates:</Typography>
            <TextField
                type="number"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="Latitude"
                required
            />
            <TextField
                type="number"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="Longitude"
                required
            />
            <Button type="submit" variant="contained">Get Weather</Button>
        </form>
    )
}


export default CoordinatesForm;