import React from 'react'
import { Box, Typography, Button } from "@mui/material"
import styles from '../styles/Info.module.scss';

const InfoCarousel = ({ nom }) => {
    return (
        <Box className={styles.box}>
            <Typography variant='h6' role='presentation'>
                {nom == "" && "hola"}
                {nom}
            </Typography>
            <Typography variant='h6' role='presentation'>
                {nom &&
                    <Button variant="contained" href={`/`} >Regresar</Button>
                }
            </Typography>
        </Box>
    )
}

export default InfoCarousel