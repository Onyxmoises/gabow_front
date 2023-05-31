import { format } from "mysql2";
import con from "../db/config";
import myquerys from "../db/myquerys";

export default async function(req,res){
    const {id}=req.body;
    try{
        const query=format(myquerys.selectPlaceById,[id]);
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
    /*con.query(myquerys.selectPlaceById,[id],(err,result)=>{
        if(err){
            res.status(500).json({
                status:"something went wrong",
                error:err
            });
        }else{
            res.status(200).json({
                status:"ok",
                info:result
            });
        }
    });*/
}