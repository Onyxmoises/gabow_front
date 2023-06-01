import React, { useState } from 'react'
import styles from '../styles/Buscador.module.scss'
import { TextField, Autocomplete, Snackbar } from "@mui/material";

const Buscador = ({ onCambio, options, setOpenInfo, setRoom }) => {

    const [value, setValue] = useState();

    const camPiso = (lugar) => {
        return new Promise((resolve, reject,) => {
            onCambio(lugar);
            resolve();
        });
    };

    const camInfo = (label) => {
        return new Promise((resolve, reject) => {
            setRoom(label);
            setTimeout(() => {
                resolve();
            }, 500);
        });
    };

    const camColor = (id) => {
        return new Promise((resolve, reject) => {
            const cont = document.getElementById("map");
            cont.querySelectorAll('.lim').forEach(element => { element.setAttribute('opacity', '0') });
            cont.querySelector(`#${id}`).setAttribute('opacity', '.7');
            cont.querySelector(`#${id}`).setAttribute('fill', '#66c0f4');
            cont.querySelector(`#${id}`).scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
            resolve();
        });
    };

    const busqueda = async (event) => {
        if (event == null) {

        } else {
            const lugar = event.lugar;
            const label = event.label;
            const id = event.id;

            await camPiso(lugar);
            await camInfo(label);
            await camColor(id);
            setOpenInfo(true);
        }
    }

    return (
        <>
            <Snackbar open anchorOrigin={{ horizontal: 'center', vertical: 'top' }} className={styles.sna}>
                <div className={styles.sel}>
                    <Autocomplete
                        classes={{ paper: styles.paper }}
                        value={value}
                        onChange={(event, newValue) => {
                            busqueda(newValue);
                        }}
                        options={options.nom_lug}
                        groupBy={(option) => option.piso}
                        renderInput={(params) => <TextField {...params} placeholder='Buscar' variant="outlined" />}
                    />
                </div>
            </Snackbar>
        </>
    )
}

export default Buscador
