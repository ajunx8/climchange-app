import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function WeatherModal({ weatherModalOpen, setWeatherModalOpen, data }) {
    const handleClose = () => setWeatherModalOpen(false);

    return (
        <div>
            {data &&
                <Modal
                    open={weatherModalOpen}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>

                        <Typography textAlign="center" id="modal-modal-title" variant="h6" component="h2">
                            Weather report for {data.name}
                        </Typography>
                        <Typography sx={{ mt: 2 }}>
                            Weather: {data?.weather[0].description}
                        </Typography>
                        <Typography sx={{ mt: 2 }}>
                            Humidity: {data.main.humidity}
                        </Typography>
                        <Typography sx={{ mt: 2 }}>
                            Temperature: {data.main.temp}
                        </Typography>
                    </Box>
                </Modal>
            }

        </div>
    );
}