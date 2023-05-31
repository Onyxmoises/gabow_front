import con from "../db/config";
import myquerys from "../db/myquerys";
import {format} from "mysql2"
export default async function(req,res){
    const {nombre,desc,horaApertura,horaCierre,pagina,latitud,longitud,categoria}=req.body;
    try{
        const query=format(myquerys.insertPlace,[nombre,desc,horaApertura,horaCierre,pagina,latitud,longitud,categoria]);
        const response=await con.query(query);
        return res.status(200).json({
            status:"ok",
            result:response
        });
    }catch(err){
        return res.status(400).json({
            status:"error",
            error:err
        });
    }
    /*console.log(req.body);
    con.query(myquerys.insertPlace,[nombre,desc,horaApertura,horaCierre,pagina,latitud,longitud,categoria],(err,result)=>{
        if(err){
            res.status(500).json({
                status:"something went wrong",
                error:err
            });
        }else{
            res.status(200).json({
                status:"ok",
                result:result
            });
        }
    });*/
}