import Link from "next/link";
const Main = () => {
    return (
        <>
            <Link href="/">
                <h3>Volver a pagina principal</h3>
            </Link>
            <h1>Administrador Gabow developed by Qu Ex</h1>
            <hr></hr>
            <ol>
                <li>
                    <Link href="/admin/uploadImage">Administrar Iconos</Link>
                </li>
                <li>
                    <Link href="/admin/locations">Administrar Ubicaciones</Link>
                </li>
            </ol>
        </>
    )
}
export default Main;