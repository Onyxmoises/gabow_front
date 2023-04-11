import React, { useState, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet'
import { Icon } from 'leaflet'
import styles from '../styles/Mapa.module.scss'
import Select from 'react-select'

import Ley from './Ley'

// Esta data se saca de la BD
const data = [
    {
        id: 1,
        label: "CECyT 9",
        value: [19.453541614839263, -99.1755475346185],
        type: "escuela"
    },
    {
        id: 2,
        label: "Town Center",
        value: [19.50353658790755, -99.20293583642929],
        type: "plaza"
    }
];

// Cambiar el icono de los marker
function icono(type) {
    const icon = new Icon({
        iconUrl: '/icons/' + type + '.png',
        // iconUrl: '/2hand.png',
        iconSize: [50, 50]
    })
    return icon
}

const Mapa = () => {
    
    const mapRef = useRef();
    const markerRef = useRef();
    
    const [cord, setCord] = useState([19.472819274952897, -99.14333273147834])

    const cambiar = selectedOption => {
        const mapC = mapRef.current;
        mapC.flyTo(selectedOption.value, 18, {
            duration: 2
        });
    }

    const onClick=(item)=>{
        const mapa=mapRef.current;
        mapa.flyTo(item.latlng,18,{
            duration:2
        });
    }

    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin="" />
            </Head>

            {/* BUSCADOR */}
            <div className={styles.container2}>
                <Select className={styles.buscador} options={data} onChange={cambiar} placeholder='Buscar'/>
            </div>

            {/* MAPA */}
            <div className={styles.container}>
                <MapContainer ref={mapRef} center={cord} zoom={11} zoomControl={false}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <ZoomControl position='bottomleft'/>
                    {data.map((item) => (
                        <Marker key={item.id} position={item.value} icon={icono(item.type)} eventHandlers={{ click: onClick }}>
                            <Popup>
                                {item.label} <br />
                                <Link href={`/Edificio/${item.id}`}><button type='button' className={styles.button}>Ir a</button></Link>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
            <Ley content={{tipo: "gen"}}/>
        </>
    )
}

export default Mapa