import React from 'react'
import { Box, Typography, Button } from "@mui/material"
import styles from '../styles/Info.module.scss';

const InfoCarousel = ({ nom }) => {
    return (
        <Box className={styles.box}>
            <Typography variant='h4'>GABOW</Typography>
            <Typography variant='h6' role='presentation'>
                <hr />
                {nom == "" && "Bienvenido"}
                {nom}
            </Typography>
            <Typography variant='h6' role='presentation'>
                <Button variant="contained" href={`/`} >Regresar</Button>
            </Typography>
        </Box>
    )
}

export default InfoCarousel