import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react"
import Select from 'react-select'
const Locations = () => {

    const [places, setPLaces] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const encabezados = ["Nombre", "Descripcion", "HoraApertura", "HoraCierre", "PaginaContacto", "Latitud", "Longitud", "Categoria"];

    const handleClick = () => {
        if (showForm) {
            setShowForm(false);
        } else {
            setShowForm(true);
        }
    }

    const handleDelete=async(id)=>{
        const {data}=await axios.post("/api/handlers/deletePlace",{
            id_est:id
        });
        if(data.status=="ok"){
            window.location.reload();
        }
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();        
        const {data}=await axios.post("/api/handlers/addPlace",{
            nombre:e.target.Nombre.value,
            desc:e.target.Descripcion.value,
            horaApertura:e.target.HoraApertura.value,
            horaCierre:e.target.HoraCierre.value,
            pagina:e.target.PaginaContacto.value,
            latitud:e.target.Latitud.value,
            longitud:e.target.Longitud.value,
            categoria:e.target.categoria.value
        });
        if(data.status=="ok"){
            window.location.reload();
        }
    }

    useEffect(()=>{
        console.log(places);
    },[places])

    useEffect(() => {
        console.log(categorias)
    }, [categorias])

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.post("/api/handlers/getMarkerDataHandler");
            setPLaces(data.data);
        }
        getData();
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
    }, [])

    return (
        <>
            <Link href="/admin/main">
                <h3>Volver</h3>
            </Link>
            <h1>Administrador de ubicaciones</h1>
            <hr></hr>
            {places.length == 0 ? (
                <>
                    <p>Aun no hay registros de lugares</p>
                </>
            ) : (
                <table border={1}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Categoria</th>
                        </tr>
                    </thead>
                    <tbody>
                        {places.map(item => (
                            <tr>
                                <td>{item.id_est}</td>
                                <td>{item.est_nombre}</td>
                                <td>
                                    <img src={item.imgBase64}></img>
                                </td>
                                <td>
                                    <button>Consultar</button>
                                </td>
                                <td>
                                    <button onClick={()=>handleDelete(item.id_est)}>Eliminar Ubicacion</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <br></br>
            <button onClick={handleClick}>{showForm ? (<>Cancelar</>) : (<>Agregar Lugar</>)}</button>
            {showForm ? (
                <>
                    <form onSubmit={handleSubmit}>
                        <table>
                            {encabezados.map(item => (
                                <tr>
                                    <td>{item}</td>
                                    {item == "Categoria" ? (
                                        <>
                                            <Select name="categoria" options={categorias}></Select>
                                        </>
                                    ) : (
                                        <>
                                            <input name={item} type={["HoraApertura","HoraCierre"].includes(item)?("time"):("text")}></input>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </table>
                        <button type="submit">Agregar Lugar</button>
                    </form>
                </>
            ) : (
                <></>
            )}
        </>
    )
}

export default Locations;




