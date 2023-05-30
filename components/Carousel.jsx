import React, { useState, useEffect } from 'react'
import { Fade } from '@mui/material';
import styles from '../styles/Carousel.module.scss'
import Info from './Info'
import Ley from './Ley'
import Buscador from './Buscador'

const options = [
    { label: "Usos Mulitiples", id: "Usos_Multiples", piso: "Planta Baja", lugar: 1},
    { label: "Ciber Batiz", id: "Ciber_Batiz", piso: "Planta Baja", lugar: 1 },
    { label: "Salon 24", id: "Salon_24", piso: "Piso 01", lugar: 2 },
    { label: "Salon 22", id: "Salon_22", piso: "Piso 01", lugar: 2 },
    { label: "Laboratorio Nuevas Tecnologias", id: "LNT", piso: "Piso 02", lugar: 3 },
    { label: "Laboratorio 1 de Fisica", id: "Lab_Fis_01", piso: "Piso 03", lugar: 4 },
];

const Carousel = ({ sr, sv, ss, onCambio }) => {

    const [openInfo, setOpenInfo] = useState(false);
    const [room, setRoom] = useState("");
    const [svgCode, setSvgCode] = useState('');
    const [sen, setSen] = useState(false);
    
    useEffect(() => {
        fetch(sv)
            .then(response => response.text())
            .then(data => setSvgCode(data));
    }, [sv]);

    const closeInfo = () => {
        setOpenInfo(false);
    }

    const verSen = () =>{
        setSen(!sen);
    }

    const handleClick = (event) => {
        const clickedElement = event.target;
        if (clickedElement.classList.contains('lim')) {
            document.querySelectorAll('.lim').forEach(element => { element.setAttribute('opacity', '0') });
            const iden = event.target.id;
            const info = options.find((object) => object.id === iden).label;
            setRoom(info);
            event.currentTarget.querySelector(`#${iden}`).setAttribute('opacity', '.7');
            event.currentTarget.querySelector(`#${iden}`).setAttribute('fill', '#66c0f4');
            setOpenInfo(true);
        }else{
            document.querySelectorAll('.lim').forEach(element => { element.setAttribute('opacity', '0') });
        }
    };

    return (
        <>
            <div className={styles.edi} >
                <img src={sr} className={styles.edi2} />
                <Fade in={sen}>
                    <img src={ss} className={styles.edi3} />
                </Fade>
                <div dangerouslySetInnerHTML={{ __html: svgCode }} className={styles.edi4} onClick={handleClick} id='map' />
            </div>

            <Info openInfo={openInfo} closeInfo={closeInfo} tipo={"car"} nom={room} room={room}/>

            <Buscador onCambio={onCambio} options={options} setOpenInfo={setOpenInfo} setRoom={setRoom} />

            <Ley tipo="edi" sen={sen} verSen={verSen}/>
        </>
    )
}

export default Carousel