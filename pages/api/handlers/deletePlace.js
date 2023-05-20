import con from "../db/config";
import myquerys from "../db/myquerys";

export default function(req,res){
    const {id_est}=req.body;
    con.query(myquerys.deletePlace,[id_est],(err,result)=>{
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