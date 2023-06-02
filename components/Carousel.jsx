import React, { useState, useEffect } from 'react'
import { Fade } from '@mui/material';
import styles from '../styles/Carousel.module.scss'
import Info from './Info'
import Ley from './Ley'
import Buscador from './Buscador'
import axios from 'axios';


const Carousel = ({ sr, sv, ss, place, onCambio }) => {

    const [options , setOptions] = useState([]);
    const [openInfo, setOpenInfo] = useState(false);
    const [room, setRoom] = useState("");
    const [svgCode, setSvgCode] = useState('');
    const [sen, setSen] = useState(false);
    
    useEffect(() => {

        const getSubPlaces = async() =>{

            const {data} = await axios.post("/api/handlers/getSubPlaces" , {
                id_est:place
            });
            setOptions(data.data);
            console.log(options);

        } // ESTA PARTE DA VALOR A LA DATA QUE SE VA USAR
          // LA PARTE DE SEC_LUG ES DEL "ID" DEL PISO, SI ES 1 ES PLANTA BAJA Y ASI, EN LA PARTE DE 
          // DARLES ID A LOS LUGARES DALES DE ID EL NOMBRE SI PUEDES Y TE ES MAS COMODO
        getSubPlaces();

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
            const info = options.find((object) => object.label === iden).label;
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

            <Info openInfo={openInfo} closeInfo={closeInfo} tipo={"car"} info={room}/>

            <Buscador onCambio={onCambio} options={options} setOpenInfo={setOpenInfo} setRoom={setRoom} />

            <Ley tipo="edi" sen={sen} verSen={verSen}/>
        </>
    )
}

export default Carousel