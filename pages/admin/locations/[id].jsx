import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Select from "react-select"
const PlaceReader = ({ locationId }) => {
    const [placeInfo, setPlaceInfo] = useState({});
    const [categorias, setCategorias] = useState([]);
    const [selectedOption, setSelectedOption] = useState({});
    const customStyles = {
        control: (provided) => ({
            ...provided,
            width: '45%', // Ajusta el valor según tus necesidades
        }),
        // Agrega otros estilos personalizados según sea necesario
    };

    function renameAttributes(json, attributeMap) {
        return Object.keys(json).reduce((acc, key) => {
            const newKey = attributeMap[key] || key;
            acc[newKey] = json[key];
            return acc;
        }, {});
    }
    useEffect(() => {
        //console.log(selectedOption);
    }, [selectedOption])
    useEffect(() => {
        /*console.log(placeInfo);
        console.log(categorias);*/
        //console.log(placeInfo.find(item => item.id_catalogo == categorias.value));
        setSelectedOption(categorias.find(item => placeInfo.id_catalogo == item.value));
    }, [placeInfo, categorias])
    useEffect(() => {
        const fetchPLaceInfoById = async () => {
            const { data } = await axios.post("/api/handlers/getPlaceInfoById", {
                id: locationId
            });
            setPlaceInfo(data.result[0]);
        }
        const fetchCateogorias = async () => {
            const { data } = await axios.post("/api/handlers/getCEstablecimiento");
            const newAttributes = {
                cest_nombre: "label",
                id_catalogo: "value"
            };
            const categoriasArray = [];
            data.result.map(item => {
                categoriasArray.push(renameAttributes(item, newAttributes));
            })
            //console.log(categoriasArray);
            setCategorias(categoriasArray);
        }
        fetchPLaceInfoById();
        fetchCateogorias();
    }, []);
    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        setPlaceInfo({
            ...placeInfo,
            id_catalogo: selectedOption.value
        });

    }
    const hanldeInputChange = (e) => {
        const { name, value } = e.target;
        //console.log(name, value);
        setPlaceInfo({
            ...placeInfo,
            [name]: value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(placeInfo);
        const { data } = await axios.post("/api/handlers/updatePlace", placeInfo);
        if (data.status == "ok") {
            window.location.reload();
        }
    }
    return (
        <>
            <Link href="/admin/locations">
                <h3>Volver</h3>
            </Link>
            <h1>Consultando Informacion de: {placeInfo.est_nombre}</h1>
            <hr></hr>
            <Select options={categorias} name="id_catalogo" styles={customStyles} value={selectedOption} onChange={handleSelectChange}></Select>
            <br></br>
            <form onSubmit={handleSubmit}>
                <table border={1} style={{ textAlign: "center" }}>
                    <tbody>
                        <tr>
                            <th>Nombre</th>
                            <td>
                                <input value={placeInfo.est_nombre} name="est_nombre" onChange={hanldeInputChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Descripcion</th>
                            <td>
                                <input value={placeInfo.est_descripcion} name="est_descripcion" onChange={hanldeInputChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Hora Apertura</th>
                            <td>
                                <input type="time" value={placeInfo.est_horaApertura} name="est_horaApertura" onChange={hanldeInputChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Hora Cierre</th>
                            <td>
                                <input type="time" value={placeInfo.est_horaCierre} name="est_horaCierre" onChange={hanldeInputChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Pagina de contacto</th>
                            <td>
                                <input value={placeInfo.est_paginaWeb} name="est_paginaWeb" onChange={hanldeInputChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Latitud</th>
                            <td>
                                <input type="number" value={placeInfo.est_latitud} name="est_latitud" onChange={hanldeInputChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Longitud</th>
                            <td>
                                <input type="number" value={placeInfo.est_longitud} name="est_longitud" onChange={hanldeInputChange} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br></br>
                <button type="submit">Guardar Cambios</button>
            </form>
            <ul>
                <li>
                    <h1>Agregar Edificios/secciones</h1>
                </li>
            </ul>
            <hr></hr>
        </>
    )
}


export async function getServerSideProps(context) {
    const { params } = context;
    const { id } = params;
    return {
        props: {
            locationId: id
        }
    }
}
export default PlaceReader;