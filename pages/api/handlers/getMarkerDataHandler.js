import con from "../db/config";
import myquerys from "../db/myquerys";
//res.status(http code).json({...})
const getMarkerDataHandler = async(req,res) =>{
    try{
        const response=await con.query(myquerys.getMarkerData);
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
    /*con.query(myquerys.getMarkerData , (error , response) =>{

        if(error){res.status(500).json({status : "somethig went wrong",error:error})}

        else{
            
            res.status(200).json({status : "ok" , data : response})
            
        }

    })*/

}

export default getMarkerDataHandler;