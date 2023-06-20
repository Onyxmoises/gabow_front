import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import dynamic from "next/dynamic"
const MyAwesomeMap = dynamic(() => import("../components/Mapa"), { ssr: false })

const Index = () => {

    const [userLocation,setUserLocation]=useState();

    useEffect(()=>{
        const success=(pos)=>{
            setUserLocation([pos.coords.latitude,pos.coords.longitude]);
        }
        const error=err=>{
            console.log(err);
        }
        navigator.geolocation.getCurrentPosition(success,error);
    })

    return (
        <>
            <Head>
                <title>GABOW</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <MyAwesomeMap location={userLocation} />
            
        </>
    )
}

export default Index