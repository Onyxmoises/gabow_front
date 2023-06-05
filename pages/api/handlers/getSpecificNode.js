import { format } from "mysql2"
import con from "../db/config"
import myquerys from "../db/myquerys"

const getSpecficNode = async(req , res) =>{
    const {label} = req.body
    try{
        const response=await con.query(myquerys.getSpecficNode);
        response[0].data.map(item =>{

            if((item[lugs_nod].split(",")).includes(label)){

                res.status(200).json({status:'OK',data:item[nom_nod]});

            }

        })
    }catch(err){
        res.status(500).json({status:'SOMETHING WENT WRONG',error:err});
    }

}

export default getSpecficNode
