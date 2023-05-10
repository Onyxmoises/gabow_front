import React, { useState } from 'react'
import styles from '../styles/Buscador.module.scss'
import { TextField, Autocomplete, Snackbar } from "@mui/material";

const Buscador = ({ onCambio, options, setOpenInfo, setRoom }) => {

    const [value, setValue] = useState();

    const manejarCambio = (event) => {
        if(event == null){

        }else{
            const id = event.id;
            onCambio(event.lugar);
            setRoom(event.label);
            setTimeout(() => {
                colorCambio(id);
            }, 200);
            setOpenInfo(true);
        }
    };

    const colorCambio = (id) => {
        document.querySelectorAll('.lim').forEach(element => { element.setAttribute('opacity', '0') });
        document.querySelector(`#${id}`).setAttribute('opacity', '.7');
        document.querySelector(`#${id}`).setAttribute('fill', '#66c0f4');
        document.querySelector(`#${id}`).scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    };

    return (
        <>
            <Snackbar open anchorOrigin={{ horizontal: 'center', vertical: 'top' }} className={styles.sna}>
                <div className={styles.sel}>
                    <Autocomplete
                        classes={{ paper: styles.paper }}
                        value={value}
                        onChange={(event, newValue) => {
                            manejarCambio(newValue);
                        }}
                        options={options}
                        groupBy={(option) => option.piso}
                        renderInput={(params) => <TextField {...params} placeholder='Buscar' variant="outlined" />}
                    />
                </div>
            </Snackbar>
        </>
    )
}

export default Buscador