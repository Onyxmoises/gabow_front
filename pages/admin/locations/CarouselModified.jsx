import React, { useState, useEffect,useRef } from 'react'
import styles from '../../../styles/Carousel.module.scss'
import Modal from '../../../components/Modal';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
const options = [
    { label: "Usos Mulitiples", id: "Usos_Multiples", piso: "Planta Baja", lugar: 1 },
    { label: "Ciber Batiz", id: "Ciber_Batiz", piso: "Planta Baja", lugar: 1 },
    { label: "Salon 24", id: "Salon_24", piso: "Piso 01", lugar: 2 },
    { label: "Salon 22", id: "Salon_22", piso: "Piso 01", lugar: 2 },
    { label: "Laboratorio Nuevas Tecnologias", id: "LNT", piso: "Piso 02", lugar: 3 },
    { label: "Laboratorio 1 de Fisica", id: "Lab_Fis_01", piso: "Piso 03", lugar: 4 },
];

const Carousel = ({ sr, sv, onCambio, id_est }) => {
    const [svgCode, setSvgCode] = useState(sv);
    const [selectedOption, setSelectedOption] = useState('');
    const [svgElement, setSvgElement] = useState(null);
    const svgContainerRef = useRef(null);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const handleSaveChanges = async() => {
        console.log(svgContainerRef.current.innerHTML);
        const {data}=await axios.post("/api/handlers/updateSvg",{
            newSvg:svgContainerRef.current.innerHTML,
            id_est:id_est
        });
        if(data.status=="ok"){
            window.location.reload();
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        //console.log('Opción seleccionada:', selectedOption);
        switch (selectedOption) {
            case "addBuilding":
                const fetchIdGeneralImage = async () => {
                    const { data } = await axios.post("/api/handlers/getIdGeneralImage", {
                        id_est: id_est
                    });
                    return data.result[0];
                }
                const insertSpace = async () => {
                    const { id_imgGeneral } = await fetchIdGeneralImage();
                    const { data } = await axios.post("/api/handlers/addSpace", {
                        esp_nombre: event.target.esp_nombre.value,
                        id: id_imgGeneral
                    });
                    if (data.status == "ok") {
                        svgElement.setAttribute("id", event.target.esp_nombre.value);
                        setIsModalOpen(false);
                        toast.success(`Edificio correcatamente agregado!`, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                    }
                }
                await insertSpace();
                break;
            case "addNode":
                console.log("hola");
                break;
        }
    };
    const handleClick = (event) => {
        //const clickedElement = event.target;
        setSvgElement(event.target);
        openModal();
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="radio"
                                id="addBuilding"
                                value="addBuilding"
                                checked={selectedOption === 'addBuilding'}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor="addBuilding">Agregar edificio/sección</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="addNode"
                                value="addNode"
                                checked={selectedOption === 'addNode'}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor="addNode">Agregar nodo al catálogo</label>
                        </div>
                        {selectedOption == "addBuilding" ? (
                            <>
                                <h1>Agregar Edificio/seccion</h1>
                                <table >
                                    <tbody>
                                        <th>
                                            Nombre
                                        </th>
                                        <td>
                                            <input name="esp_nombre"></input>
                                        </td>
                                    </tbody>
                                </table>
                                <button >Guardar</button>
                            </>
                        ) : selectedOption == "addNode" ? (
                            <>
                                <h1>Agregar Nodo</h1>
                                <button >Guardar</button>
                            </>
                        ) : (
                            <></>
                        )}
                    </form>
                </Modal>
            </div>
            <button onClick={handleSaveChanges}>Guardar Cambios</button>
            <div className={styles.edi} >
                <img src={sr} className={styles.edi2} />
                <div ref={svgContainerRef} dangerouslySetInnerHTML={{ __html: svgCode }} className={styles.edi4} onClick={handleClick} id='map' />
            </div>
        </>
    )
}



export default Carousel