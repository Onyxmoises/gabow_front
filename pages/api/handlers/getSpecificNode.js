import con from "../db/config"
import myquerys from "../db/myquerys"

const getSubPlaces = (req , res) =>{
    const {label} = req.body
    con.query(myquerys.getSpecficNode, (err , response)=>{
        if(err){

            res.status(500).json({status:'SOMETHING WENT WRONG',error:err})
        }
        else{
            response.data.map(item =>{

                if((JSON.parse(item[lugs_nod].replace(/'/g , '""'))).includes(label)){

                    res.status(200).json({status:'OK',data:item[nom_nod]});

                }

            })
            
        }
    })
}

export default getSubPlaces