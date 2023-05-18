import React, { useState, useRef } from 'react'
import Head from 'next/head'
import { MapContainer, TileLayer, Marker, ZoomControl, } from 'react-leaflet'
import ResetViewControl from '@20tab/react-leaflet-resetview';
import { Icon } from 'leaflet'
import styles from '../styles/Mapa.module.scss'
import Select from 'react-select'

import Ley from './Ley'
import Info from './Info'

// Esta data se saca de la BD
const data = [
    {
        id: 1,
        label: "CECyT 9",
        value: [19.453541614839263, -99.1755475346185],
        type: "escuela",
        puntuacion: 1,
        horario: ["jueves 9:00-21:00",
                "viernes 7:00-21:00",
                "sábado	Cerrado",
                "domingo Cerrado",
                "lunes 7:00-21:00",
                "martes 7:00-21:00",
                "miércoles 7:00-21:00"]
    },
    {
        id: 2,
        label: "Town Center",
        value: [19.50353658790755, -99.20293583642929],
        type: "plaza",
        puntuacion: 4,
        horario: ["jueves 10:00-21:00",
                "viernes 10:00-21:00",
                "sábado 10:00-21:00",
                "domingo 10:00-21:00",
                "lunes 10:00-21:00",
                "martes 10:00-21:00",
                "miércoles 10:00-21:00"]
    }
];

// Cambiar el icono de los marker
function icono(type) {
    const icon = new Icon({
        iconUrl: '/icons/' + type + '.png',
        iconSize: [50, 50]
    })
    return icon
}

const Mapa = () => {
    
    const mapRef = useRef();
    const markerRef = useRef();
    
    const [openInfo, setOpenInfo] = useState(false);
    const [edi, setEdi] = useState(0);
    const [nom, setNom] = useState("");
    const [cord, setCord] = useState([19.472819274952897, -99.14333273147834]);
    const [value, setValue] = useState(0);
    const [hor, setHor] = useState("");
    
    const cambiar = selectedOption => {
        const mapC = mapRef.current;
        const inf = selectedOption.id;
        
        setOpenInfo(true);
        setEdi(inf);

        const dat = data[inf - 1];
        setNom(dat.label);

        mapC.flyTo(selectedOption.value, 18, {
            duration: 2
        });
    }
    
    const onClick = (e) => {
        const mapa = mapRef.current;
        const inf = e.sourceTarget.options.id;
        
        setOpenInfo(true);
        setEdi(inf);

        const dat = data[inf - 1];
        setNom(dat.label);
        setValue(dat.puntuacion);
        setHor(dat.horario);

        mapa.flyTo(e.latlng,18,{
            duration:2
        });
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

                    <ResetViewControl position='bottomleft' icon="url(/pointer.png)"/>

                    {data.map((item) => (
                        <Marker key={item.id} id={item.id} position={item.value} icon={icono(item.type)} eventHandlers={{ click: onClick }} />
                    ))}

                </MapContainer>
            </div>
            
            <Ley tipo={'gen'}/>

            <Info openInfo={openInfo} closeInfo={closeInfo} tipo={"map"} edi={edi} nom={nom} value={value} hor={hor}/>
        </>
    )
}

export default Mapa