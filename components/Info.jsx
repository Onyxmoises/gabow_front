import React, { useState, useEffect } from 'react'
import { Drawer, Box, Typography, IconButton, Grid, Snackbar, useMediaQuery, Button, Rating, Popover } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import styles from '../styles/Info.module.scss';

const Info = ({ tipo, openInfo, closeInfo, edi, nom, value, hor }) => {

    const [isOpen, setIsOpen] = useState(false)
    const isDesktop = useMediaQuery('(min-width:960px)');

    useEffect(() => {
        setIsOpen(openInfo);
    }, [openInfo]);

    const closeAll = () => {
        closeInfo();
        setIsOpen(false);
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Snackbar open anchorOrigin={{ horizontal: 'left', vertical: 'top' }} className={styles.cont}>
                <Grid container spacing={2}>
                    <Grid item>
                        <IconButton variant='contained' className={styles.icon} onClick={() => setIsOpen(true)}>
                            <MenuIcon className={styles.icon} />
                        </IconButton>
                    </Grid>
                </Grid>
            </Snackbar>
            <Drawer anchor={isDesktop ? 'left' : 'bottom'} open={isOpen} onClose={closeAll}>
                <Box className={styles.box}>
                    <hr />
                    <Typography variant='h4'>GABOW</Typography>
                    <hr />
                    <Typography variant='h6' role='presentation'>
                        {nom == "" && "Bienvenido"}
                        {nom}
                    </Typography>
                    <Typography variant='h6' role='presentation'>
                        {tipo == "map" && edi != 0 &&
                            <div>
                                <Typography variant='h6' role='presentation'>
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
                                </Typography>
                                <Typography>
                                    <Rating value={value} readOnly />
                                </Typography>
                                <Typography>
                                    <Button variant="contained" href={`/Edificio/${edi}`} >ir a</Button>
                                </Typography>
                            </div>
                        }
                        {tipo == "car" &&
                            <Button variant="contained" href={`/`} >Regresar</Button>
                        }
                    </Typography>
                </Box>
            </Drawer>

        </>
    )
}

export default Info