import React, { useState } from 'react'
import styles from '../styles/Buscador.module.scss'
import { TextField, Autocomplete, Snackbar } from "@mui/material";
import { resolve } from 'styled-jsx/css';

const Buscador = ({ onCambio, options, setOpenInfo, setRoom }) => {

    const [value, setValue] = useState(null);

    const cInfo = (lugar, label) => new Promise((resolve, reject) => {
        setTimeout(() => {
            onCambio(lugar);
            setRoom(label);
            resolve();
        }, 200);
    });

    const cColor = (id) => new Promise((resolve, reject) => {
        setTimeout(() => {
            document.querySelectorAll('.lim').forEach(element => { element.setAttribute('opacity', '0') });
            document.querySelector(`#${id}`).setAttribute('opacity', '.7');
            document.querySelector(`#${id}`).setAttribute('fill', '#66c0f4');
            resolve();
        }, 200);
    });

    const cambio = async (event) => {
        const lugar = event.lugar;
        const label = event.label;
        const id = event.id;
        await cInfo(lugar, label);
        await cColor(id);
        setOpenInfo(true);
    };

    return (
        <>
            <Snackbar open anchorOrigin={{ horizontal: 'center', vertical: 'top' }} className={styles.sna}>
                <div className={styles.sel}>
                    <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                            cambio(newValue);
                        }}
                        options={options}
                        groupBy={(option) => option.piso}
                        renderInput={(params) => <TextField {...params} placeholder='Buscar' />}
                    />
                </div>
            </Snackbar>
        </>
    )
}

export default Buscador