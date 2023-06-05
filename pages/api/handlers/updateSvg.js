import { format } from "mysql2";
import con from "../db/config";
import myquerys from "../db/myquerys";
import axios from "axios";
export default async function(req,res){
    const {newSvg,id_est}=req.body;
    console.log(id_est)
    console.log(newSvg);
    try{
        const query=format(myquerys.updateSvg,[newSvg,id_est]);
        const response=await con.query(query);
        return res.status(200).json({
            status:"ok",
            result:response[0]
        });
    }catch(err){
        return res.status(200).json({
            status:"ok",
            error:err
        });
    }
}