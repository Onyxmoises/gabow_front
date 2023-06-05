import React from 'react'
import { Button, Typography } from "@mui/material"
import styles from '../styles/Info.module.scss';
import axios from 'axios';

const InfoEdi = ({ info }) => {
  return (
    <>
      <Typography>
        {info}
      </Typography>

      <Typography>
        <Button variant="contained" href={`/`} >Regresar</Button>
      </Typography>
      <Typography>
        <Button variant="contained" href={`/`} >Empezar ruta</Button>
      </Typography>
    </>
  )
}

export default InfoEdi
