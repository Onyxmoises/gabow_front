import myquerys from "../db/myquerys";
import con from "../db/config";
import { format } from "mysql2";
export default async function(req,res){
    const {images}=req.body;
    try{
        images.map(async item=>{
            const query=format(myquerys.insertImages,[item.base64string,item.id]);
            await con.query(query);
        });
        return res.status(200).json({
            status:"ok",
        });
    }catch(err){
        return res.staus(400).json({
            status:"error",
            error:err
        });
    }
    /*images.map(item=>{
        con.query(myquerys.insertImages,[item.base64string,item.id],(err,result)=>{
            if(err){
                res.status(500).json({status:"something went wrong",error:err});
            }
        });
    })
    res.status(200).json({status:"ok"});*/
}