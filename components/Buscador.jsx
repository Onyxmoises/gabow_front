import React from 'react'
import styles from '../styles/Buscador.module.scss'

const Buscador = (props) => {

    const manejarCambio = (event) => {
        props.onCambio(parseInt(event.target.value));
    };

    return (
        <>
            <div>Buscador</div>
            <select className={styles.sel} onChange={manejarCambio}>
                <option value="1">PB</option>
                <option value="2">P03</option>
            </select>
        </>
    )
}

export default Buscador