import React , {useState} from 'react'
import { Button, Typography } from "@mui/material"
import styles from '../styles/Info.module.scss';
import axios from 'axios';

const InfoEdi = ({ info }) => {

  const [initial,setInital] = useState("");
  const [destin,setDestin] = useState("");
  const getNode = async() =>{

    const node = await axios.post('/api/handlers/getSpecificnode' , {

      label:info

    })

    if(inital != ""){

      setDestin(node.data);
      
    }
    else if(destin != "" && inital != ""){

      setDestin(node.data)

    }
    else{

      setInital(node.data);

    }

  }
  
  return (
    <>
      <Typography>
        {info}
      </Typography>

      <Typography>
        <Button variant="contained" href={`/`} >Regresar</Button>
      </Typography>
      <Typography>
        <Button variant="contained" onClick={getNode} >Escoger Lugar</Button>
      </Typography>
    </>
  )
}

export default InfoEdi