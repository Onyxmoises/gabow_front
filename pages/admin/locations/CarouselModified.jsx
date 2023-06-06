import React, { useState, useEffect, useRef } from 'react'
import styles from '../../../styles/Carousel.module.scss'
import Modal from '../../../components/Modal';
import Select from "react-select"
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
const customStyles = {
    control: (provided) => ({
        ...provided,
        borderRadius: '8px',
        borderColor: '#ccc',
        boxShadow: 'none',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#f2f2f2' : 'white',
        color: state.isSelected ? '#333' : '#666',
    }),
    // Agrega más estilos personalizados según tus necesidades
};
const Carousel = ({ sr, sv, onCambio, id_est }) => {
    const [svgCode, setSvgCode] = useState(sv);
    const [selectedOption, setSelectedOption] = useState('');
    const [svgElement, setSvgElement] = useState(null);
    const svgContainerRef = useRef(null);
    const [lugares, setLugares] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState('')
    const [selectedPlaces, setSelectedPlaces] = useState([]);
    useEffect(() => {
        console.log(lugares);
    }, [lugares])

    const fetchLugares = async () => {
        const { data } = await axios.post("/api/handlers/getLugares", {
            id_est: id_est
        });
        setLugares(data.result);
    }
    useEffect(() => {
        fetchLugares();
    }, []);
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const handleSaveChanges = async () => {
        console.log(svgContainerRef.current.innerHTML);
        navigator.clipboard.writeText(svgContainerRef.current.innerHTML)
            .then(() => {
                toast.success(`Se agrego el svg al portapapeles`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            })
            .catch((error) => {
                console.error('Error al copiar al portapapeles:', error);
            });
        /*const { data } = await axios.post("/api/handlers/updateSvg", {
            newSvg: svgContainerRef.current.innerHTML,
            id_est: id_est
        });
        if (data.status == "ok") {
            window.location.reload();
        }*/
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        //console.log('Opción seleccionada:', selectedOption);
        switch (selectedOption) {
            case "addBuilding":
                console.log({
                    label: event.target.label.value,
                    sec_lug: event.target.sec_lug.value,
                    id_est: id_est,
                    sec: event.target.sec.value
                })
                const { data } = await axios.post("/api/handlers/addLugar", {
                    label: event.target.label.value,
                    sec_lug: event.target.sec_lug.value,
                    id_est: id_est,
                    sec: event.target.sec.value
                });
                if (data.status == "ok") {
                    svgElement.setAttribute("id", event.target.label.value);
                    setIsModalOpen(false);
                    toast.success(`Lugar correcatamente agregado!`, {
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
                /*const fetchIdGeneralImage = async () => {
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
                //await insertSpace();
                const updateSpace = async () => {
                    const { data } = await axios.post("/api/handlers/updateSvgId", {
                        newName: event.target.esp_nombre.value,
                        oldName: svgElement.id
                    });
                    svgElement.setAttribute("id", event.target.esp_nombre.value);
                    setIsModalOpen(false);
                    toast.success(`Edificio correcatamente actualizado!`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                };
                svgElement.id ? await updateSpace() : await insertSpace();
                /*if(svgElement.id){
                    console.log("ya tiene id");
                }else{
                    await insertSpace();
                }*/
                break;
            case "addNode":
                console.log("hola");
                console.log(lugares);
                const responseAxios=await axios.post("/api/handlers/addNode",{
                    nombre:event.target.label.value,
                    lugares:selectedPlaces,
                    id_est:id_est
                });
                if(responseAxios.data.status=="ok"){
                    svgElement.setAttribute("id", event.target.label.value);
                    setIsModalOpen(false);
                    toast.success(`Nodo correctamente agregado`, {
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
                break;
        }
    };
    const handleClick = (event) => {
        //const clickedElement = event.target;
        setSvgElement(event.target);
        fetchLugares();
        setSelectedPlaces([])
        openModal();
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handlePlaceSelect = (selectedOption) => {
        const newSelectedPlaces = [...selectedPlaces, selectedOption.label];
        setSelectedPlaces(newSelectedPlaces);
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
                            <label htmlFor="addBuilding">Agregar Lugar</label>
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
                                        <tr>
                                            <th>
                                                Label
                                            </th>
                                            <td>
                                                <input type='text' name='label'></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                Sec_lug
                                            </th>
                                            <td>
                                                <input type='text' name='sec_lug'></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                Sec
                                            </th>
                                            <td>
                                                <input type='text' name='sec'></input>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button type='submit'>Guardar</button>
                            </>
                        ) : selectedOption == "addNode" ? (
                            <>
                                <h1>Agregar Nodo</h1>
                                <table >
                                    <tbody>
                                        <tr>
                                            <th>
                                                Nombre
                                            </th>
                                            <td>
                                                <input type='text' name='label'></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                Lugares
                                            </th>
                                            <td>
                                                <Select
                                                    isSearchable
                                                    placeholder="Selecciona un lugar" onChange={handlePlaceSelect} styles={customStyles} options={lugares} />
                                                <p>Selecciones: {selectedPlaces.join(', ')}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button type='submit' >Guardar</button>
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