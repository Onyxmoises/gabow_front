import React, { useState } from 'react'
import styles from '../styles/Buscador.module.scss'
import { TextField, Autocomplete, Snackbar } from "@mui/material";

const Buscador = (props) => {

    const options = [
        { label: "UsosMulit.", id: 1, piso: "PB" },
        { label: "Ciber", id: 2, piso: "PB" },
        { label: "Salon 24", id: 19, piso: "P01" },
        { label: "Salon 25", id: 5, piso: "P01" },
        { label: "Progra", id: 10, piso: "P02" },
        { label: "Fisica", id: 20, piso: "P03" },
    ];

    const [value, setValue] = useState(null);

    const manejarCambio = (event) => {
        props.onCambio(parseInt(event.target.value));
    };

    return (
        <>
            {/* <div>Buscador</div>
            <select className={styles.sel} onChange={manejarCambio}>
                <option value="1">PB</option>
                <option value="2">P03</option>
            </select> */}
            <Snackbar open anchorOrigin={{ horizontal: 'center', vertical: 'top' }} className={styles.sna}>
                <div className={styles.sel}>
                    <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
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