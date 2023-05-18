import con from "../db/config";
import myquerys from "../db/myquerys";
//res.status(http code).json({...})
const getMarkerDataHandler = (req,res) =>{

    con.query(myquerys.getMarkerData , (error , response) =>{

        if(error){res.status(500).json({status : "somethig went wrong"})}

        else{
            
            res.status(200).json({status : "ok" , data : response})
            
        }

    })

}

export default getMarkerDataHandler;