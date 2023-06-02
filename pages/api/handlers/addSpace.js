import { format } from "mysql2";
import con from "../db/config";;
import myquerys from "../db/myquerys";
export default async function(req,res){
    const {esp_nombre,id_est}=req.body;
    try{
        const query=format(myquerys.addSpace,[esp_nombre,id_est])
        const response=await con.query(query);
        return res.status(200).json({
            status:"ok",
            result:response[0]
        });
    }catch(err){
        return res.status(400).json({
            status:"error",
            error:err
        });
    }
}