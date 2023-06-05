import { format } from "mysql2";
import con from "../db/config";
import myquerys from "../db/myquerys";
export default async function (req, res) {
    const { img_dibujo, img_svg, id_est } = req.body;
    try {
        const query = format(myquerys.insertGeneralImage, [img_dibujo, img_svg, id_est]);
        const response = await con.query(query);
        return res.status(200).json({
            status:"ok",
            result:response[0]
        });
    } catch (err) {
        return res.status(500).json({
            status:"ok",
            error:err
        });
    }

}