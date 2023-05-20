import myquerys from "../db/myquerys";
import con from "../db/config";
export default function(req,res){
    const {images}=req.body;
    images.map(item=>{
        con.query(myquerys.insertImages,[item.base64string,item.id],(err,result)=>{
            if(err){
                res.status(500).json({status:"something went wrong",error:err});
            }
        });
    })
    res.status(200).json({status:"ok"});
}