import React, { useState } from 'react'
import Head from 'next/head'
import { Pagination, Snackbar } from '@mui/material'
import { useRouter } from 'next/router'
import Carousel from '../../components/Carousel'
import styles from '../../styles/Edificio.module.scss'

const Edificio = () => {
    
    const [change, setChange] = useState(1)
    
    const router = useRouter()

    if (!router.isReady) {
        return <div>Cargando...</div>;
    }

    const { place } = router.query

    const data = [
        { label: "PB", sr: `/${place}/PB.jpg`, sv: `/${place}/PB.svg` },
        { label: "P01", sr: `/${place}/P01.jpg`, sv: `/${place}/P01.svg` },
        { label: "P02", sr: `/${place}/P02.jpg`, sv: `/${place}/P02.svg` },
        { label: "P03", sr: `/${place}/P03.jpg`, sv: `/${place}/P03.svg` },
    ]

    const dat = data[change - 1];
    const nDat = data.length;

    const arrowsAcction = (event, value) => {
        setChange(value);
    }

    const manejarCambio = (nuevoValor) => {
        setChange(nuevoValor);
    };

    const changeLabel = () => {
        return dat.label;
    }

    return (
        <>
            <Head>
                <title>GABOW</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Carousel sr={dat.sr} sv={dat.sv} place={place} onCambio={manejarCambio} />

            <Snackbar open anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }} className={styles.sna}>
                <div className={styles.arrows}>
                    {/* <p>{dat.label}</p> */}
                    <Pagination count={nDat} page={change} onChange={arrowsAcction} siblingCount={0} boundaryCount={0} showFirstButton showLastButton getItemAriaLabel={changeLabel}/>
                </div>
            </Snackbar>
        </>
    )
}

export default Edificio