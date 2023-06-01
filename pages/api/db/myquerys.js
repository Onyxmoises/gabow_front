const myquerys ={
    getMarkerData : `select * from ESTABLECIMIENTOS_VIEW;`,
    getCatalogos:"select id_catalogo,cest_nombre,convert(imgBase64 using utf8) as imgBase64 from CEstablecimientos",
    insertImages:"update CEstablecimientos set imgBase64=? where id_catalogo=?",
    insertPlace:"insert into Establecimientos(est_nombre,est_descripcion,est_horaApertura,est_horaCierre,est_paginaWeb,est_latitud,est_longitud,id_catalogo) values(?,?,?,?,?,?,?,?)",
    deletePlace:"delete from Establecimientos where id_est=?",
    selectPlaceById:"select * from Establecimientos where id_est=?",
    getNodeList:"select * from Nodos",
    getSubPlace:"select * from Lugares where id_est=?",
    insertSubplace:"insert into Lugares(nom_lug,sec_lug,id_est) values(?,?,?)",
    insertNode:"insert into Nodos(nom_nod,lat_nod,lon_nod,id_lug,id_est) values(?,?,?,?,?)"
}

export default myquerys;