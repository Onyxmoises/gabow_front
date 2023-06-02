import React, { useState } from 'react'
import { Box, Typography, Button, Rating, Popover } from "@mui/material"
import styles from '../styles/Info.module.scss';

const InfoMap = ({ info }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        !Object.keys(info).length ?

            <Typography variant='h6' role='presentation'>
                Bienvenido
            </Typography>

            :

            <Box className={styles.box}>

                {/* NOMBRE */}
                <Typography variant='h6' role='presentation'>
                    {info.est_nombre}
                    {console.log(info)}
                </Typography>

                {/* Boton IR A */}
                <Typography>
                    <Button variant="contained" href={`/Edificio/${info.id_est}`} >ir a</Button>
                </Typography>

                {/* HORARIO */}
                {/* <Typography variant='h6' role='presentation'>
                    <Button variant="contained" onClick={handleClick} >Horarios</Button>
                    <Popover
                        className={styles.popover}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}>
                        {hor.map((item) => (
                            <Typography> {item} </Typography>
                        ))}
                    </Popover>
                </Typography> */}

                {/* CALIFICACION */}
                {/* <Typography>
                    <Rating value={value} readOnly />
                </Typography> */}

            </Box>
    )
}

export default InfoMap