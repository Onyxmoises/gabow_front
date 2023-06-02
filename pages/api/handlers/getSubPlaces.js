import con from "../db/config"
import myquerys from "../db/myquerys"

const getSubPlaces = (req , res) =>{
    const {id_est} = req.body
    con.query(myquerys.getSubPlace , [id_est] , (err , response)=>{
        if(err){
            res.status(500).json({status:'SOMETHING WENT WRONG',error:err})
        }
        else{
            res.status(200).json({status:'OK',data:response})
        }
    })
}

export default getSubPlaces