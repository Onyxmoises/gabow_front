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
    insertNode:"insert into Nodos(nom_nod,lat_nod,lon_nod,id_lug,id_est) values(?,?,?,?,?)",
    updatePlace:`update Establecimientos set est_nombre=?,est_descripcion=?,est_horaApertura=?,est_horaCierre=?,est_paginaWeb=?,est_latitud=?,est_longitud=?,id_catalogo=? where id_est=?`,
    addSpace:"insert into Espacios(esp_nombre,id_imgGeneral) values(?,?)",
    insertGeneralImage:"insert into VistaGeneral(img_dibujo,img_svg,id_est) values(?,?,?)",
    getGeneralImage:"select convert(img_dibujo using utf8) as img_dibujo, convert(img_svg using utf8) as img_svg from VistaGeneral where id_est=?",
    getIdImgGeneral:"select * from VistaGeneral where id_est=?",
    updateSvg:"update VistaGeneral set img_svg=? where id_est=?",
    updateSpace:"update Espacios set esp_nombre=? where esp_nombre=? ",
    insertSections:"insert into Secciones(sec_nombre,sec_dibujo.sec_svg,sec_sennalizacion,id_est) values(?,?,?,?,?)",
    addLugar:"insert into Lugares(label,sec_lug,id_est,sec) values(?,?,?,?)",
    addNode:`INSERT INTO Nodos(nom_nod, lugs_nod, id_est) VALUES (?, REPLACE("?", '"', ''), ?)`
}

export default myquerys;
