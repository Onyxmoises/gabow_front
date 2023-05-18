const myquerys ={

    getMarkerData : `select * from ESTABLECIMIENTOS_VIEW;`,
    getCatalogos:"select id_catalogo,cest_nombre,convert(imgBase64 using utf8) as imgBase64 from CEstablecimientos",
    insertImages:"update CEstablecimientos set imgBase64=? where id_catalogo=?",
    insertPlace:"insert into Establecimientos(est_nombre,est_descripcion,est_horaApertura,est_horaCierre,est_paginaWeb,est_latitud,est_longitud,id_catalogo) values(?,?,?,?,?,?,?,?)",
    deletePlace:"delete from Establecimientos where id_est=?"
}

export default myquerys;