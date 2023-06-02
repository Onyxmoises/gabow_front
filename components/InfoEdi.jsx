import React from 'react'
import { Button, Typography } from "@mui/material"
import styles from '../styles/Info.module.scss';

const InfoEdi = ({ info }) => {
  return (
    <>
      <Typography>
        {info}
      </Typography>

      <Typography>
        <Button variant="contained" href={`/`} >Regresar</Button>
      </Typography>
    </>
  )
}

export default InfoEdi