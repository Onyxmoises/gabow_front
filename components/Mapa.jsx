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

const Mapa = () => {

    const mapRef = useRef();
    const markerRef = useRef();

    const [openInfo, setOpenInfo] = useState(false);
    const [cord, setCord] = useState([19.472819274952897, -99.14333273147834]);
    const [data, setData] = useState([]);
    const [info, setInfo] = useState({});

    useEffect(() => {

        const getMarkerData = async () => {

            const { data } = await axios.post("/api/handlers/getMarkerDataHandler", {})
            data.data.map((item, index) => {
                data.data[index] = { ...item, label: item.est_nombre };
            })
            setData(data.data)
            console.log(data.data);

        }

        getMarkerData();

    }, [])

    const cambiar = selectedOption => {
        console.log(selectedOption);
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

                    {data.map((item) => (
                        <Marker key={item.id_est} id={item.id_est} position={[item.est_latitud, item.est_longitud]} icon={new Icon({ iconUrl: item.imgBase64, iconSize: [50, 50] })} eventHandlers={{ click: onClick }} />
                    ))}

                </MapContainer>
            </div>

            <Ley tipo={'gen'} />

            <Info tipo={"map"} openInfo={openInfo} closeInfo={closeInfo} info={info} />
        </>
    )
}

export default Mapa