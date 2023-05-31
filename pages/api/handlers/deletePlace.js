import { format } from "mysql2";
import con from "../db/config";
import myquerys from "../db/myquerys";

export default async function (req, res) {
    const { id_est } = req.body;
    try {
        const query = format(myquerys.deletePlace, [id_est]);
        const response = await con.query(query);
        return res.status(200).json({
            status:"ok",
            response:response
        })
    } catch (err) {
        return res.status(400).json({
            status:"error",
            error:err
        });
    }

    /*con.query(myquerys.deletePlace,[id_est],(err,result)=>{
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
    });*/
}