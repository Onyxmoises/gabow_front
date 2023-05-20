import { useRouter } from "next/router";
import { useEffect,useState } from "react";
import axios from "axios";
const Location=()=>{
    const router = useRouter();
    const { id } = router.query;
    const [placeInfo,setPlaceInfo]=useState([]);
    useEffect(()=>{
        console.log(placeInfo);
    },[placeInfo])
    useEffect(()=>{
        const fetchPlaceInfo=async()=>{
            const {data}=await axios.post("/api/handlers/getPlaceInfoById",{
                id:id
            });
            setPlaceInfo(data.info);
        }
        fetchPlaceInfo();
    },[])
    return (
      <div>
        <h1>Página con parámetro</h1>
        <p>ID: {id}</p>
      </div>
    );
}
export default Location;