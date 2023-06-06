import { format } from "mysql2"
import con from "../db/config"
import myquerys from "../db/myquerys"

const getSubPlaces = async (req, res) => {
    const { id_est } = req.body
    try {
        const query = format(myquerys.getSubPlace, [id_est]);
        const response = await con.query(query);
        return res.status(200).json({
            status: "ok",
            data: response[0]
        });
    } catch (err) {
        return res.status(400).json({
            status:"err",
            error:err
        });
    }
    /*con.query(myquerys.getSubPlace , [id_est] , (err , response)=>{
        if(err){
            res.status(500).json({status:'SOMETHING WENT WRONG',error:err})
        }
        else{
            res.status(200).json({status:'OK',data:response})
        }
    })*/
}

export default getSubPlaces