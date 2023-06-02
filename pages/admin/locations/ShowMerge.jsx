import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Carousel from './CarouselModified'
import styles from '../../../styles/Edificio.module.scss'

const Edificio = ({base64Draw,svgCode,id_est}) => {

    const [change, setChange] = useState(1)

    const data = [
        { label: "general", sr:base64Draw, sv: svgCode },
    ];
       

    const dat = data[change - 1];

    const manejarCambio = (nuevoValor) => {
        setChange(nuevoValor);
    };

    return (
        <>
            <Head>
                <title>GABOW</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Carousel sr={dat.sr} sv={dat.sv} onCambio={manejarCambio} id_est={id_est}/>
        </>
    )
}

export default Edificio