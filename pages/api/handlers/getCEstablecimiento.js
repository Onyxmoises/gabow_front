import con from "../db/config";
import myquerys from "../db/myquerys";
export default function(req,res){
    con.query(myquerys.getCatalogos,(err,result)=>{
        if(err){
            return res.status(500).json({
                status:"something went wrong",
                error:err
            });
        }else{
            return res.status(200).json({
                status:"ok",
                data:result
            });
        }
    });
}