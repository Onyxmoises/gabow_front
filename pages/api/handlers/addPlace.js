import con from "../db/config";
import myquerys from "../db/myquerys";

export default function(req,res){
    const {nombre,desc,horaApertura,horaCierre,pagina,latitud,longitud,categoria}=req.body;
    console.log(req.body);
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
    });
}