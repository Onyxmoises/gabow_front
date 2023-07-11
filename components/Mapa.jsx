import React, { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import { MapContainer, TileLayer, Marker, ZoomControl, } from 'react-leaflet'
import ResetViewControl from '@20tab/react-leaflet-resetview';
import { Icon } from 'leaflet'
import styles from '../styles/Mapa.module.scss'
import Select from 'react-select'
import axios from 'axios';
import Ley from './Ley'
import Info from './Info'

const Places = [
    {
        id_est: 5,
        est_latitud: 19.45361372364191,
        est_longitud: -99.17536925858711,
        est_iconUrl: "/icons/escuela.png",
        est_nombre: "CECyT 9"
    },
    {
        id_est: 3,
        est_latitud: 19.42104635225278,
        est_longitud: -99.1857119382349,
        est_iconUrl: "/icons/fountain (4).png",
        est_nombre: "Bosque de chapultepec"
    }
]

const Mapa = ({ location }) => {

    const mapRef = useRef();

    const [openInfo, setOpenInfo] = useState(false);
    const [cord, setCord] = useState([19.472819274952897, -99.14333273147834]);
    const [data, setData] = useState(Places);
    const [info, setInfo] = useState({});

    const cambiar = selectedOption => {
        const mapC = mapRef.current;
        const inf = selectedOption.id_est;
        const dat = data.find(item => item.id_est == inf);

        setInfo(dat);

        mapC.flyTo([selectedOption.est_latitud, selectedOption.est_longitud], 18, {
            duration: 2
        });
        setOpenInfo(true);
    }

    const onClick = (e) => {
        const mapa = mapRef.current;
        const inf = e.sourceTarget.options.id;
        const dat = data.find(item => item.id_est == inf);

        setInfo(dat);

        mapa.flyTo(e.latlng, 18, {
            duration: 2
        });
        setOpenInfo(true);
    }

    const closeInfo = () => {
        setOpenInfo(false);
    }

    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin="" />
            </Head>

            {/* BUSCADOR */}
            <div className={styles.container2}>
                <Select className={styles.buscador} options={data} onChange={cambiar} placeholder='Buscar' />
            </div>

            {/* MAPA */}
            <div className={styles.container}>
                <MapContainer ref={mapRef} center={cord} zoom={11} zoomControl={false}>

                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />

                    <ZoomControl position='bottomleft' />

                    <ResetViewControl position='bottomleft' icon="url(/pointer.png)" />

                    {Places.map((item) => (
                        <Marker key={item.id_est} id={item.id_est} position={[item.est_latitud, item.est_longitud]} icon={new Icon({ iconUrl: item.est_iconUrl, iconSize: [50, 50] })} eventHandlers={{ click: onClick }} />
                    ))}

                </MapContainer>
            </div>

            <Ley tipo={'gen'} />

            <Info tipo={"map"} openInfo={openInfo} closeInfo={closeInfo} info={info} />
        </>
    )
}

export default Mapa