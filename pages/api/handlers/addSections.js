export default async function(req,res){
    const {info}=req.body;
    console.log(info);
    return res.status(200).json({status:"ok"})
}