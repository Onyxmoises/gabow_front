import con from "../db/config";
import myquerys from "../db/myquerys";
export default async function(req,res){
    try{
        const response=await con.query(myquerys.getCatalogos);
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

    /*con.query(myquerys.getCatalogos,(err,result)=>{
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
    });*/
}