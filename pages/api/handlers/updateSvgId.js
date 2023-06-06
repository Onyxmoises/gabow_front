import { format } from "mysql2";
import myquerys from "../db/myquerys";
import con from "../db/config";
export default async function(req,res){
    const {newName,oldName}=req.body;
    try{
        const query=format(myquerys.updateSpace,[newName,oldName]);
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