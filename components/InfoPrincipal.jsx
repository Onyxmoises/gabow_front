import React from 'react'
import { Box, Typography, Button } from "@mui/material"
import styles from '../styles/Info.module.scss';

const InfoPrincipal = ({ nom, edi }) => {
    return (
        <>
            <Box className={styles.box}>
                <Typography variant='h6' role='presentation'>
                    {nom == "" && "Bienvenido a GABOW"}
                    {nom}
                </Typography>
                <Typography variant='h6' role='presentation'>
                    {edi != 0 &&
                        <Button variant="contained" href={`/Edificio/${edi}`} >ir a</Button>
                    }
                </Typography>
            </Box>
        </>
    )
}

export default InfoPrincipal