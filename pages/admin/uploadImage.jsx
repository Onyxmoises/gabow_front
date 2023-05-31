import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
const ImageUploadForm = () => {

    const [catalogos, setCatalogos] = useState([]);
    const [base64, setBase64] = useState([]);

    useEffect(()=>{
        console.log(catalogos);
    },[catalogos]);

    const handleImageChange = (event) => {

        console.log(event.target.id)
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Image = reader.result;
            setBase64([...base64, {
                id: event.target.id,
                base64string: base64Image
            }]);
            catalogos.find(item => item.id_catalogo == event.target.id).imgBase64 = base64Image;
        };
        reader.readAsDataURL(file);
    };

    const handleChanges = async () => {
        const { data } = await axios.post("/api/handlers/uploadImage", { images: base64 });
        if (data.status == "ok") {
            window.location.reload();
        }
    }

    useEffect(() => {
        console.log(base64);
    }, [base64]);

    useEffect(() => {
        const getDataFromCEstablecimientos = async () => {
            const { data } = await axios.post("/api/handlers/getCEstablecimiento");
            setCatalogos(data.result);
        }
        getDataFromCEstablecimientos();
    }, []);

    return (
        <>
            <Link href="/admin/main">
                <h3>Volver</h3>
            </Link>
            <h1>Administrador de iconos</h1>
            <hr></hr>
            <table border={1} style={{ textAlign: "center" }}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre Catalogo</th>
                        <th>Imagen</th>
                    </tr>
                </thead>
                <tbody>
                    {catalogos && catalogos.map(item => (
                        <tr key={item.id_catalogo}>
                            <td>{item.id_catalogo}</td>
                            <td>{item.cest_nombre}</td>
                            <td>
                                {item.imgBase64 ? (
                                    <>
                                        <img src={item.imgBase64} />
                                    </>
                                ) : (
                                    <>
                                        <input type="file" id={item.id_catalogo} accept="image/*" onChange={handleImageChange} />
                                    </>
                                )}
                            </td>
                            {item.imgBase64 ? (
                                <>
                                    <p>Actualizar Imagen: </p>
                                    <input type="file" id={item.id_catalogo} accept="image/*" onChange={handleImageChange} />
                                </>
                            ) : (
                                <>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>

            </table>
            <br></br>
            <button onClick={handleChanges}>Guardar Cambios</button>
            <br></br>
        </>
    )
};

export default ImageUploadForm;
