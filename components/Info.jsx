import React, { useState, useEffect } from 'react'
import { Drawer, Box, Typography, IconButton, Grid, Snackbar, useMediaQuery, Button } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import styles from '../styles/Info.module.scss';

const Info = ({ tipo, openInfo, closeInfo, edi, nom }) => {

    const [isOpen, setIsOpen] = useState(false)
    const isDesktop = useMediaQuery('(min-width:960px)');

    useEffect(() => {
        setIsOpen(openInfo);
    }, [openInfo]);

    const closeAll = () => {
        closeInfo();
        setIsOpen(false);
    }

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
                    <Typography variant='h6' role='presentation'>
                        <hr />
                        {nom == "" && "Bienvenido"}
                        {nom}
                    </Typography>
                    <Typography variant='h6' role='presentation'>
                        {tipo == "map" && edi != 0 &&
                            <Button variant="contained" href={`/Edificio/${edi}`} >ir a</Button>
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