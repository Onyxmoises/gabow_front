import con from "../../db/config";

export default async function(req,res){
    const response=await con.query("select * from Establecimientos");
    return res.status(200).json({
        result:response
    });

}