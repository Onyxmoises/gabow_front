import React, { useState } from 'react'
import styles from '../styles/Buscador.module.scss'
import { TextField, Autocomplete, Snackbar } from "@mui/material";

const Buscador = ({ onCambio, options, setOpenInfo, setRoom }) => {

    const [value, setValue] = useState(null);

    const manejarCambio = (event) => {
        const id = event.id;
        onCambio(event.lugar)
        setTimeout(colorCambio, 200, id);
        setRoom(event.label);
    };
    
    const colorCambio = (id) => {
        document.querySelectorAll('.lim').forEach(element => { element.setAttribute('opacity', '0') });
        document.querySelector(`#${id}`).setAttribute('opacity', '.7');
        document.querySelector(`#${id}`).setAttribute('fill', '#66c0f4');
        setOpenInfo(true);
    }

    return (
        <>
            <Snackbar open anchorOrigin={{ horizontal: 'center', vertical: 'top' }} className={styles.sna}>
                <div className={styles.sel}>
                    <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                            manejarCambio(newValue);
                        }}
                        options={options}
                        groupBy={(option) => option.piso}
                        renderInput={(params) => <TextField {...params} placeholder='Buscar'/>}
                    />
                </div>
            </Snackbar>
        </>
    )
}

export default Buscador