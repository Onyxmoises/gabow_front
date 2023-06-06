import { format } from "mysql2";
import con from "../db/config";
import myquerys from "../db/myquerys";
export default async function(req,res){
    const {nombre,lugares,id_est}=req.body;
    try{
        const query=format(myquerys.addNode,[nombre,lugares,id_est]);
        const response=await con.query(query);
        return res.status(200).json({
            status:"ok",
            result:response
        });
    }catch(err){
        return res.status(400).json({
            status:"err",
            error:err
        });
    }
}