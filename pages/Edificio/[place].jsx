import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Pagination, Snackbar } from '@mui/material'
import { useRouter } from 'next/router'
import Carousel from '../../components/Carousel'
import styles from '../../styles/Edificio.module.scss'
import axios from 'axios'

const Edificio = () => {

    useEffect(()=>{
        
    }); 


    const [change, setChange] = useState(1)

    const router = useRouter()

    const { place } = router.query

    const data = [
        { label: "GEN", sr: `/${place}/GEN.jpg`, sv: `/${place}/GEN.svg`, ss: `/${place}/GEN.png` },
        { label: "PB", sr: `/${place}/PB.jpg`, sv: `/${place}/PB.svg`, ss: `/${place}/PB.png` },
        { label: "P01", sr: `/${place}/P01.jpg`, sv: `/${place}/P01.svg`, ss: `/${place}/P01.png` },
        { label: "P02", sr: `/${place}/P02.jpg`, sv: `/${place}/P02.svg`, ss: `/${place}/P02.png` },
        { label: "P03", sr: `/${place}/P03.jpg`, sv: `/${place}/P03.svg`, ss: `/${place}/P03.png` },
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
        console.log(dat.label)
        return dat.label;
    }
    useEffect(() => {
        
    });
    return (
        <>
            <Head>
                <title>GABOW</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Carousel sr={dat.sr} sv={dat.sv} ss={dat.ss} place={place} onCambio={manejarCambio} />

            <Snackbar open anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }} className={styles.sna}>
                <div className={styles.arrows}>
                    <Pagination count={nDat} page={change} onChange={arrowsAcction} siblingCount={0} boundaryCount={0} showFirstButton showLastButton />
                </div>
            </Snackbar>
        </>
    )

    }

export default Edificio
