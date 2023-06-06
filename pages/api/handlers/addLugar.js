import { format } from "mysql2";
import con from "../db/config";
import myquerys from "../db/myquerys";
export default async function(req,res){
    const {label,sec_lug,id_est,sec}=req.body;
    console.log(req.body);
    try{
        const query=format(myquerys.addLugar,[label,sec_lug,id_est,sec]);
        const response=await con.query(query);
        return res.status(200).json({
            status:"ok",
            result:response[0]
        });
    }catch(err){
        return res.status(200).json({
            status:"err",
            error:err
        });
    }
}