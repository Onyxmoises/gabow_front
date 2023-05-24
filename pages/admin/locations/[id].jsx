import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select"
import Link from "next/link";

const PlaceReader = ({ locationId }) => {
    const [placeInfo, setPlaceInfo] = useState({});
    const [categorias, setCategorias] = useState([]);
    const [selectedOption, setSelectedOption] = useState({});
    useEffect(() => {
        console.log(categorias);
        console.log(placeInfo);
        //setSelectedOption(categorias.find(item => item.value == placeInfo.id_catalogo));
    }, [categorias, placeInfo]);
    useEffect(() => {
        const fetchLocationInfo = async () => {
            const { data } = await axios.post("/api/handlers/getPlaceInfoById", {
                id: locationId
            });
            setPlaceInfo(data.info[0]);
        }
        fetchLocationInfo();
        const fetchCategorias = async () => {
            const { data } = await axios.post("/api/handlers/getCEstablecimiento");
            data.data.map(item => {
                item.label = item.cest_nombre;
                item.value = item.id_catalogo;
                delete item.cest_nombre;
                delete item.id_catalogo;
            });
            setCategorias(data.data);
        }
        fetchCategorias()
    }, []);
    function obtenerCambios(objeto1, objeto2) {
        const cambios = {};
        for (const key in objeto2) {
            if (objeto1[key] !== objeto2[key]) {
                cambios[key] = objeto2[key];
            }
        }
        return cambios;
    }
    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        /*const formInfo = {
            id_est: locationId,
            est_nombre: event.target.est_nombre,
            est_descripcion: event.target.est_descripcion,
            est_horaApertura: event.target.est_horaApertura,
            est_horaCierre: event.target.est_horaCierre,
            est_latitud: event.target.est_latitud,
            est_longitud: event.target.est_longitud,
            est_paginaWeb: event.target.est_paginaWeb,
            id_catalogo: event.target.id_catalogo
        }
        console.log(obtenerCambios(placeInfo, formInfo))*/
    }
    if (locationId) {
        return (
            <>
                <Link href="/admin/locations">
                    <h3>Volver</h3>
                </Link>
                <h1>Consulta de {placeInfo.est_nombre}</h1>
                <hr></hr>
                <form onSubmit={handleSubmit}>
                    <table border={1} style={{ textAlign: "center" }}>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripcion</th>
                                <th>Hora Apertura</th>
                                <th>Hora Cierre</th>
                                <th>Latitud</th>
                                <th>Longitud</th>
                                <th>Pagina web</th>
                                <th>Categoria</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input type="text" name="est_nombre" value={placeInfo.est_nombre}></input>
                                </td>
                                <td>
                                    <input type="text" name="est_descripcion" value={placeInfo.est_descripcion}></input>
                                </td>
                                <td>
                                    <input type="time" name="est_horaApertura" value={placeInfo.est_horaApertura}></input>
                                </td>
                                <td>
                                    <input type="time" name="est_horaCierre" value={placeInfo.est_horaCierre}></input>
                                </td>
                                <td>
                                    <input type="number" name="est_latitud" value={placeInfo.est_latitud}></input>
                                </td>
                                <td>
                                    <input type="number" name="est_longitud" value={placeInfo.est_longitud}></input>
                                </td>
                                <td>
                                    <input type="text" name="est_paginaWeb" value={placeInfo.est_paginaWeb}></input>
                                </td>
                                <td>
                                    <Select options={categorias} name="id_catalogo" value={selectedOption}></Select>
                                </td>
                                <td>
                                    <button type="submit">Guardar Cambios</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </>
        )
    }
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