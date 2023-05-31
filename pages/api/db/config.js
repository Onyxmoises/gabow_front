import {createPool} from "mysql2/promise";

const con=createPool({
    host:"containers-us-west-90.railway.app",
    user:"root",
    password:"5167sfiTZ0noZMSPx2p8",
    port:"7950",
    database:"railway"
});

export default con;