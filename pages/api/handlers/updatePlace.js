import { format } from "mysql2";
import con from "../db/config";
import myquerys from "../db/myquerys";
export default async function(req,res){
    try{
        const {id_est,est_nombre,est_descripcion,est_horaApertura,est_horaCierre,est_paginaWeb,est_latitud,est_longitud,id_catalogo}=req.body;
        const query=format(myquerys.updatePlace,[est_nombre,est_descripcion,est_horaApertura,est_horaCierre,est_paginaWeb,est_latitud,est_longitud,id_catalogo,id_est]);
        const response=await con.query(query);        
        return res.status(200).json({status:"ok",result:response});
    }catch(err){
        return res.status(400).json({
            status:"error",
            error:err
        });
    }
}