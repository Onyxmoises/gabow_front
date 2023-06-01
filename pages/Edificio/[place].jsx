import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Pagination, Snackbar } from '@mui/material'
import { useRouter } from 'next/router'
import Carousel from '../../components/Carousel'
import styles from '../../styles/Edificio.module.scss'
import axios from 'axios'

const Edificio = () => {
    useEffect(() => {

        const getInfoRoute = async (reference, i, d) => {

            const { data } = await axios.get(`https://emiliorifaschidopro.pythonanywhere.com/getGraph?i=${i}&d=${d}&reference=${reference}`)

            console.log(data.graph_Data.shortestPath)

            const shortest_Route = data.graph_Data.shortestPath;
            shortest_Route.map(node => {

                try {

                    if (document.getElementById(node) != null) { document.getElementById(node).style.opacity = 1 }

                }
                catch (e) {

                    console.log(e)

                }

            })
            for (let index = 0; index < shortest_Route.length; index++) {

                const firstConection = shortest_Route[index] + '-' + shortest_Route[index + 1]
                const secondConection = shortest_Route[index + 1] + '-' + shortest_Route[index]

                if (document.getElementById(firstConection) != null) {

                    try {

                        document.getElementById(firstConection).style.opacity = 1

                    }
                    catch (e) {

                        console.log(e)

                    }

                }
                else {

                    try {

                        document.getElementById(secondConection).style.opacity = 1

                    }
                    catch (e) {

                        console.log(e)

                    }

                }

            }


        }

        getInfoRoute('batiz_Graph', 'F', 'O')

    }, [])

    const [change, setChange] = useState(1)

    const router = useRouter()

    if (!router.isReady) {
        return <div>Cargando...</div>;
    }

    const { place } = router.query

    const data = [
        { label: "GEN", sr: `/${place}/GEN.jpg`, sv: `/${place}/GEN.svg`, ss: `/${place}/GEN.png` },
        { label: "PB", sr: `/${place}/PB.jpg`, sv: `/${place}/PB.svg`, ss: `/${place}/PB.png` },
        { label: "P01", sr: `/${place}/P01.jpg`, sv: `/${place}/P01.svg`, ss: `/${place}/P01.png` },
        { label: "P02", sr: `/${place}/P02.jpg`, sv: `/${place}/P02.svg`, ss: `/${place}/P02.png` },
        { label: "P03", sr: `/${place}/P03.jpg`, sv: `/${place}/P03.svg`, ss: `/${place}/P03.png` },
    ]

    const typePlace = {

        1: 'batiz_Graph',
        2: 'townCenter_Graph'

    };

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

            <Carousel sr={dat.sr} sv={dat.sv} ss={dat.ss} place={place} onCambio={manejarCambio} />

            <Snackbar open anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }} className={styles.sna}>
                <div className={styles.arrows}>
                    <Pagination count={nDat} page={change} onChange={arrowsAcction} siblingCount={0} boundaryCount={0} showFirstButton showLastButton getItemAriaLabel={changeLabel} />
                </div>
            </Snackbar>
        </>
    )
}

export default Edificio