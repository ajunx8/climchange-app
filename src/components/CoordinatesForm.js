import { useState } from 'react';

function CoordinatesForm(props) {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
  
    const handleSubmit = (event) => {
      event.preventDefault();
      props.fetchData(latitude, longitude);
      alert(`The coordinates you entered were: ${ latitude } ${ longitude }`)
    }

return (
    <form onSubmit={handleSubmit}>
        <label>Enter your coordinates:
            <input 
                type="text" 
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="Latitude"
            />

            <input 
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="Longitude"
            />
        </label>
            <input type="submit" />
        </form>
      )
    }
    

export default CoordinatesForm;