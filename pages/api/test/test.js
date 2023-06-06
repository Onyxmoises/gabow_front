import { format } from "mysql2";
import con from "../db/config";
import myquerys from "../db/myquerys";
export default async function(req,res){
    const query=format(myquerys.getGeneralImage,[1]);
    const response=await con.query(query);
    return res.status(200).json({
        status:"ok",
        result:response
    });
}